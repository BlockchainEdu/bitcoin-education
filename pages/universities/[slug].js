import React, { useEffect, useState } from "react";
import Head from "next/head";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
import { TeamMemberService } from "../../services";
import styles from "../../styles/ben-network.module.css";
import { slugify } from "../../lib/slugify";
import {
  buildTitleToId,
  pickId,
  col,
  extractAssetIdFromFilesColumn,
  buildAssetsById,
  extractUrlFromMondayValue,
  parseTitleToRoleCompany,
  imgSrc,
  initialsFromName,
} from "../../lib/mondayHelpers";

const BG_BASE = "bg-benwhite-500";
const BG_WHITE = "bg-white";

function PersonAvatar({ src, name, className }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div className="people-avatar-placeholder" aria-label={name || "Avatar"}>
        {initialsFromName(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name || ""}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

const UNIVERSITIES_BOARD_ID = 18394872099;
const STUDENTS_BOARD_ID = 18398134588;

export default function UniversityPage({ university, students }) {
  const uniName = university?.name || "University";
  const uniLogo = university?.image || null;

  return (
    <div className={`${styles.root} ${BG_BASE} min-h-screen text-benblack-500`}>
      <Head>
        <title>{uniName} | BEN Network</title>
        <meta name="robots" content="index,follow" />
      </Head>

      <HeaderWithLogoDark />

      <section className={`${BG_WHITE} py-16 border-t border-black/5`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <div className="inline-flex items-center gap-3 justify-center">
                <div className="w-16 h-16 rounded-full bg-white border border-black/10 flex items-center justify-center overflow-hidden">
                  {uniLogo ? (
                    <img
                      src={imgSrc(uniLogo)}
                      alt={uniName}
                      className="w-full h-full object-contain"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <span className="text-sm font-semibold">
                      {initialsFromName(uniName)}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-benblack-500">
                  {uniName}
                </h1>
              </div>
            </header>

            <div className="people-grid reveal">
              {students.map((a) => (
                <div key={a.id || a.name} className="people-item">
                  <div className="people-avatar">
                    <PersonAvatar
                      src={a.image ? imgSrc(a.image) : null}
                      name={a.name}
                      className="people-avatar-img"
                    />
                  </div>

                  <div className="people-meta">
                    <div className="people-name">{a.name}</div>
                    <div className="people-company">{a.company}</div>
                    <div className="people-role">{a.role}</div>

                    <div className="people-socials">
                      {a.linkedin ? (
                        <a
                          className="social-btn"
                          href={a.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn de ${a.name}`}
                          title="LinkedIn"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05C12 8.88 13.57 7.7 15.94 7.7 20.02 7.7 21 10.29 21 14.1V23h-4v-7.9c0-1.88-.04-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.16V23h-4V8Z"
                            />
                          </svg>
                        </a>
                      ) : null}

                      {a.twitter ? (
                        <a
                          className="social-btn"
                          href={a.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Twitter/X de ${a.name}`}
                          title="X"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M18.244 2H21l-6.54 7.47L22.5 22h-6.6l-5.17-6.77L4.8 22H2l7.06-8.07L1.5 2h6.77l4.67 6.12L18.244 2Zm-1.16 18h1.83L7.27 3.9H5.31L17.084 20Z"
                            />
                          </svg>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {students.length === 0 ? (
              <div className="mt-10 mb-10 text-sm text-benblack-500/70 text-center">
                No students are currently listed for this university.
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300",
  );

  const slug = params?.slug || "";

  const universitiesQuery = `{
    boards (ids: ${UNIVERSITIES_BOARD_ID}) {
      columns { id title type }
      items_page (limit: 500) {
        items {
          id
          name
          assets { id public_url }
          column_values { id value text }
        }
      }
    }
  }`;

  const uniRes = await TeamMemberService.getMembers({
    query: universitiesQuery,
  });
  const uniBoard = uniRes?.data?.data?.boards?.[0];
  const uniItems = uniBoard?.items_page?.items ?? [];
  const uniColumnsMap = buildTitleToId(uniBoard?.columns ?? []);

  const uniTitleId =
    pickId(uniColumnsMap, ["Title", "title", "Name"]) || "name";
  const uniPicturesId =
    pickId(uniColumnsMap, ["Pictures", "pictures", "files", "Logo", "Image"]) ||
    "files";

  const uniItem = uniItems.find((it) => {
    const titleText = col(it, uniTitleId)?.text || it?.name || "";
    return slugify(titleText) === slug;
  });

  if (!uniItem) return { notFound: true };

  const uniTitle =
    col(uniItem, uniTitleId)?.text || uniItem?.name || "University";

  const uniPicsCv = col(uniItem, uniPicturesId);
  const uniAssetId = extractAssetIdFromFilesColumn(uniPicsCv);
  const uniAssetsById = buildAssetsById(uniItem?.assets ?? []);
  const uniImgFromAssets =
    (uniAssetId ? uniAssetsById.get(uniAssetId) : null) ||
    uniItem?.assets?.[0]?.public_url ||
    null;

  const uniImgFallback =
    extractUrlFromMondayValue(uniPicsCv) || uniPicsCv?.text || null;

  const university = {
    id: uniItem.id,
    name: uniTitle,
    image: uniImgFromAssets || uniImgFallback || null,
  };

  const studentsQuery = `{
    boards (ids: ${STUDENTS_BOARD_ID}) {
      columns { id title type }
      items_page (limit: 500) {
        items {
          id
          name
          assets { id public_url }
          column_values { id value text }
        }
      }
    }
  }`;

  const studentsRes = await TeamMemberService.getMembers({
    query: studentsQuery,
  });
  const studentsBoard = studentsRes?.data?.data?.boards?.[0];
  const studentsItems = studentsBoard?.items_page?.items ?? [];
  const studentsColumnsMap = buildTitleToId(studentsBoard?.columns ?? []);

  const titleId = pickId(studentsColumnsMap, ["Title", "title"]) || "text";
  const universityId =
    pickId(studentsColumnsMap, ["University", "university", "School", "Uni"]) ||
    null;
  const picturesId =
    pickId(studentsColumnsMap, ["Pictures", "pictures"]) || "files";
  const linkedinId =
    pickId(studentsColumnsMap, ["LinkedIn", "linkedin"]) || null;
  const twitterId =
    pickId(studentsColumnsMap, ["Twitter", "twitter", "X"]) || null;

  const uniSlug = slugify(university.name);

  const students = (studentsItems || [])
    .filter((it) => {
      if (!universityId) return false;
      const v = col(it, universityId)?.text || "";
      return slugify(v) === uniSlug;
    })
    .map((it) => {
      const titleText = col(it, titleId)?.text ?? "";
      const { role, company } = parseTitleToRoleCompany(titleText);

      const ln = linkedinId
        ? extractUrlFromMondayValue(col(it, linkedinId)) ||
          col(it, linkedinId)?.text ||
          null
        : null;

      const tw = twitterId
        ? extractUrlFromMondayValue(col(it, twitterId)) ||
          col(it, twitterId)?.text ||
          null
        : null;

      const picsCv = col(it, picturesId);
      const assetId = extractAssetIdFromFilesColumn(picsCv);
      const assetsById = buildAssetsById(it?.assets ?? []);
      const imgFromAssets =
        (assetId ? assetsById.get(assetId) : null) ||
        it?.assets?.[0]?.public_url ||
        null;

      const imgFallback =
        extractUrlFromMondayValue(picsCv) || picsCv?.text || null;

      return {
        id: it.id,
        name: it.name,
        role,
        company,
        image: imgFromAssets || imgFallback || null,
        linkedin: ln,
        twitter: tw,
      };
    });

  return { props: { university, students } };
}
