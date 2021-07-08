import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Image from "next/image";
import PartnerShipBenefits from "../../components/partnershipBenefits";
import PartnersSlider from "../../components/partnersSlider";
import { TeamMemberService } from "../../services";

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [categories, setCategorise] = useState([]);
  useEffect(async () => {
    let body = {
      query: `{
          boards (ids: 1449692436) {
              items {
                group {
                    id
                    title
                }
                id
                name
                column_values {
                    id
                    title
                    value
                }
                assets {
                    public_url 
                }
            }
          }
      }`,
    };
    let result = await TeamMemberService.getMembers(body);
    console.log(result)
    if (result?.data?.data?.boards) {
      let categories_temp = []
      let temp = result.data.data.boards[0].items.map(item => {
        !categories_temp.includes(item.group.title) && categories_temp.push(item.group.title)
        return {
          id: item.id,
          name: item.name,
          category: item.group.title,
          url: item.assets[0]?.public_url?item.assets[0]?.public_url : null
        }
      })
      setPartners(temp)
      setCategorise(categories_temp)
    }
  }, []);
  return (
    <div id="partners-page" className="overflow-hidden">
      <HeaderWithLogoDark />
      <div className="pt-12 pb-0 lg:py-40 lg:pb-20 px-7">
        <div className="max-w-7xl m-auto flex flex-col lg:flex-row">
          <div className="w-full lg:w-8/12">
            <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
              Proven commitment to global blockchain education
            </h1>
            <p className="text-black text-md pt-10 max-w-xl m-auto lg:m-0 text-center lg:text-left font-medium">
              BEN partners with committed protocols, startups, corporations and
              associations that have proven commitment to accelerating the
              adoption of blockchain technology and are actively seeking to
              further educate the next generation of blockchain leaders.
            </p>
          </div>
          <div className="w-full lg:w-6/12 m-auto pt-24 lg:pt-14 pb-14 lg:pb-24 flex justify-center lg:justify-start">
            <Image
              className="m-auto"
              src="/images/partners-hero.png"
              width="548"
              height="552"
            />
          </div>
        </div>
      </div>
      <section className="max-w-7xl m-auto mt-0 lg:-mt-40 pb-20 md:pb-24">
        <div className="px-7">
          <p className="text-center lg:text-left mx-auto lg:mx-0 text-black text-md pt-10 max-w-md pb-6">
            Depending on your preferred level of involvement, BEN partnership
            benefits include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-3 gap-x-10">
            <PartnerShipBenefits benefit="Participate in BEN talent survey and recruiting process" />
            <PartnerShipBenefits benefit="Sponsorship discounts & priority" />
            <PartnerShipBenefits benefit="Propose and contribute to projects" />
            <PartnerShipBenefits benefit="Talent pipeline from top global universities" />
            <PartnerShipBenefits benefit="Incorporate educational material in our university-accredited blockchain courses, events and meetups" />
            <PartnerShipBenefits benefit="Participate in BEN Research" />
            <PartnerShipBenefits
              benefit="Participate and suggest working groups"
              style="lg:-mt-5"
            />
            <PartnerShipBenefits
              benefit="Free or subsidized tickets to paid events"
              style="lg:-mt-0"
            />
            <PartnerShipBenefits
              benefit="Assist sourcing speakers and sponsors for events"
              style="lg:-mt-10"
            />
          </div>
        </div>
      </section>
      <div
        className="py-40 pt-20 pb-20 px-7"
        style={{ backgroundColor: "#F5F7F7" }}
      >
        <div className="max-w-7xl m-auto flex flex-col lg:flex-row">
          <div className="w-full md:w-8/12 m-auto flex justify-center lg:justify-start">
            <Image
              className="m-auto"
              src="/images/should-you-illustration.png"
              width="729"
              height="712"
            />
          </div>
          <div className="w-full lg:w-6/12">
            <h1 className="ml-0 lg:ml-20 text-4xl md:text-5xl font-black text-black max-w-6xl pt-10 leading-snug text-center lg:text-left">
              Should your company partner with BEN?
            </h1>
            <div className="flex justify-center lg:justify-left font-mont pt-20 lg:pt-36">
              <div className="w-1/5">
                <Image
                  src="/images/community-partners-icon.png"
                  width="102"
                  height="96"
                />
              </div>
              <p className="w-4/5" style={{ maxWidth: "360px" }}>
                <b>Community Partners:</b> Non-profit organizations and
                associations interested in sharing educational content to their
                community.
              </p>
            </div>
            <div className="flex justify-center lg:justify-left font-mont py-10 lg:py-5">
              <div className="w-1/5">
                <Image
                  src="/images/content-partners-icon.png"
                  width="112"
                  height="82"
                />
              </div>
              <p className="w-4/5" style={{ maxWidth: "360px" }}>
                <b>Content Partners:</b> Any entity interested in contributing
                to the educational content for online and accredited courses.
              </p>
            </div>
            <div className="flex justify-center lg:justify-left font-mont">
              <div className="w-1/5">
                <Image
                  src="/images/event-partners-icon.png"
                  width="111"
                  height="82"
                />
              </div>
              <p className="w-4/5" style={{ maxWidth: "360px" }}>
                <b>Event Partners:</b> Any entity interested in co-hosting one
                or many events with students, clubs, and organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 m-auto">
        {categories.length > 0 && categories.map((category, index) => 
          <PartnersSlider title={category} key={index} data={partners.filter(item => item.category === category)}/>
        )}
      </div>
      <div className="-mt-40 md:-mt-60">
      <Footer />
      </div>
    </div>
  );
}
