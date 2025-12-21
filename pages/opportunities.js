import React, { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import StandardButton from "../components/standardButton";
import PartnersSlider from "../components/partnersSlider";
import { TeamMemberService } from "../services";

export default function Opportunities({ events, eventDeals }) {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const body = {
        query: `{
          boards (ids: 1449692436) {
            items_page (limit: 40) {
              items {
                group {
                  id
                  title
                }
                id
                name
                column_values {
                  id
                  value
                }
                assets {
                  public_url
                }
              }
            }
          }
        }`,
      };

      const result = await TeamMemberService.getMembers(body);

      if (result?.data?.data?.boards) {
        const temp = result.data.data.boards[0].items_page.items.map(
          (item) => ({
            id: item.id,
            name: item.name,
            category: item.group.title,
            url: item.assets[0]?.public_url ? item.assets[0].public_url : null,
          })
        );
        setPartners(temp);
      }
    };

    fetchPartners();
  }, []);

  const renderEventCard = (event, index) => {
    const deal = eventDeals[event.name];
    let link = null;

    if (deal !== undefined) {
      try {
        link = JSON.parse(deal.link.value);
      } catch (e) {
        console.error("Error parsing deal link value:", e);
      }
    }

    return (
      <div
        key={index}
        className="event-card-container bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-5 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-1"
      >
        <div className="flex flex-col h-full">
          <div className="mb-3">
            <div className="event-name text-xl font-semibold mb-1 text-benblack-500">
              {event.name}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <span className="event-date mr-2">{event.dateLabel}</span>
              <span className="event-location">• {event.location}</span>
            </div>
            {event.description && (
              <p className="text-sm text-gray-600">{event.description}</p>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-2">
            <StandardButton
              link={event.url}
              text="More info"
              target="_blank"
              styling="w-full flex justify-center"
            />
            {deal && link && (
              <StandardButton
                link={link.url}
                text={deal.message}
                target="_blank"
                color="orange"
                styling="w-full flex justify-center"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="opportunities-page" className="bg-benwhite-500 min-h-screen">
      <Head>
        <title>
          Opportunities for Student Builders | Blockchain Education Network
        </title>
      </Head>

      <HeaderWithLogoDark />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-benorange-100 opacity-80" />
        <div className="relative container mx-auto pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-[-0.02em]">
              <span className="text-benorange-500">Opportunities</span>
              <span className="text-benblack-500"> for</span>
              <br />
              <span className="text-benblack-500">Student Builders</span>
            </h1>
            <p className="text-lg text-benblack-500 opacity-90">
              Access conferences, hackathons and scholarships through the
              Blockchain Education Network.
            </p>
          </div>
        </div>
      </section>

      {/* Event cards */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col mb-8 gap-2 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-benblack-500 mx-auto tracking-tight">
                Upcoming conferences, hackathons and events
              </h2>
              <p className="text-sm text-gray-600">
                Events are ordered from the soonest to the furthest in time.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map(renderEventCard)}
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section
        id="apply"
        className="relative py-20 px-6 bg-bencustomblack-500 overflow-hidden"
      >
        {/* <div
          className="absolute inset-0 pointer-events-none z-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage:
              "url('/images/opportunities/blob-scene-haikei.svg')",
          }}
        /> */}

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-tight mb-4 text-white">
              Apply for support
            </h2>

            <p className="text-base lg:text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              <span className="text-white/80">
                BEN may support you with discounts, scholarships or special
                access so you can attend key conferences and hackathons.
              </span>
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  University / School
                </label>
                <input
                  type="text"
                  name="university"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                LinkedIn profile
              </label>
              <input
                type="url"
                name="linkedin"
                required
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                GitHub or project link (optional)
              </label>
              <input
                type="url"
                name="projectLink"
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                What are you building or what do you want to build?
              </label>
              <textarea
                name="whatBuilding"
                required
                rows={4}
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            {/* CTA editorial */}
            <div className="pt-2 flex flex-col items-center gap-2">
              <div className="flex items-start space-x-2">
                {" "}
                <input
                  id="founderPipeline"
                  type="checkbox"
                  name="founderPipeline"
                  className="mt-1 h-4 w-4"
                />{" "}
                <label htmlFor="founderPipeline" className="text-sm text-white">
                  {" "}
                  I want to join the BEN founder pipeline{" "}
                </label>{" "}
              </div>

              <button
                type="submit"
                className="
            mt-4
            px-10
            py-3
            rounded-full
            bg-benorange-500
            text-white
            text-sm
            font-semibold
            tracking-wide
            transition-colors
            duration-200
            hover:bg-bencustomorange-500
          "
              >
                Submit application
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const eventsResult = await TeamMemberService.getMembers({
    query: `{
      boards (ids: 5755322687) {
        items_page (limit:500){
          items {
            group {
              title
            }
            name
            column_values {
              value
            }
            assets {
              public_url
            }
          }
        }
      }
    }`,
  });

  console.log(
    "TOTAL ITEMS:",
    eventsResult?.data?.data?.boards[0]?.items_page?.items?.length
  );

  const dealsResult = await TeamMemberService.getMembers({
    query: `{
      boards (ids: 5775320038) {
        items_page (limit:500){
          items {
            name
            column_values{
              value
            }
          }
        }
      }
    }`,
  });

  let events = [];
  let eventDeals = {};

  if (eventsResult?.data?.data?.boards.length > 0) {
    const items = eventsResult.data.data.boards[0].items_page.items;

    events = items.reduce((acc, item) => {
      let formattedDate;
      const todayPlus7 = new Date();
      todayPlus7.setDate(todayPlus7.getDate() + 7);

      try {
        const startDate = new Date(
          JSON.parse(item.column_values[5].value).date
        );
        formattedDate = startDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        let dateToCompareToToday = startDate;

        if (item.column_values[6].value) {
          const endDate = new Date(
            JSON.parse(item.column_values[6].value).date
          );
          formattedDate =
            formattedDate +
            " - " +
            endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          dateToCompareToToday = endDate;
        }

        if (dateToCompareToToday < todayPlus7) {
          return acc;
        }
      } catch {
        return acc;
      }

      let description = "";
      try {
        if (item.column_values[4]?.value) {
          description = JSON.parse(item.column_values[4].value);
        }
      } catch {
        description = "";
      }

      acc.push({
        name: item.name,
        dateLabel: formattedDate,
        location: JSON.parse(item.column_values[2].value),
        url: JSON.parse(item.column_values[3].value),
        description,
        sortDate: new Date(
          JSON.parse(item.column_values[5].value).date
        ).getTime(),
      });

      return acc;
    }, []);

    events.sort((a, b) => a.sortDate - b.sortDate);
  }

  if (dealsResult?.data?.data?.boards) {
    const dealItems = dealsResult.data.data.boards[0].items_page.items;

    eventDeals = dealItems.reduce((acc, item) => {
      let event = item.column_values[0].value;
      event = event.replace(/^"|"$/g, "");
      const message = item.name;
      const link = item.column_values[1];

      if (event) {
        acc[event] = { message, link };
      }

      return acc;
    }, {});
  }

  return {
    props: {
      events,
      eventDeals,
    },
    revalidate: 3600,
  };
}
