import React, { useEffect } from "react";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import LinkButton from "@components/LinkButton";
import styles from "@styles/main.module.css";
import itemImage1 from "@images/image_item1.png";
import itemImage2 from "@images/image_item2.png";
import itemImage3 from "@images/image_item3.png";
import itemImage4 from "@images/image_item4.png";
import profile from "@images/image_landing1.png";
import example1 from "@images/image_landing2.png";
import example2 from "@images/image_landing3.png";
import example3 from "@images/image_landing4.png";
import bell from "@images/image_landing5.png";
import keyboard from "@images/image_landing11.png";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <TopSection />
      <MainSection />
      <BottomSection />
      <Footer />
    </>
  );
}

// SectionLayout

type SectionLayoutProps = {
  bgColor: string;
  innerContainer: boolean;
  children: React.ReactNode;
  wave?: boolean;
};

function SectionLayout({
  bgColor,
  innerContainer = true,
  children,
  wave,
}: SectionLayoutProps) {
  const waveStyles = `${wave ? "-mt-[calc(100vw*(200/375))] pt-[calc(100vw*(170/375))] lg:-mt-[400px] lg:pt-[370px] " : "pt-[100px] md:pt-[160px] lg:pt-[200px]"}`;
  return (
    <div
      style={{ backgroundColor: `var(--color-${bgColor})` }}
      id="viewport"
      className={`relative pb-[100px] text-gray500 md:pb-[160px] lg:pb-[200px] ${waveStyles}`}
    >
      <div id="outer-container" className="m-auto max-w-[1920px]">
        <div
          id="inner-container"
          className={`${innerContainer ? "m-auto max-w-[1024px] p-[0_20px] md:p-[0_36px] lg:p-[0_68px]" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// TopSection

function TopSection() {
  return (
    <SectionLayout bgColor="gray20" innerContainer={true}>
      <section
        id="TopSection"
        className="flex flex-col items-center gap-[40px]"
      >
        <div className="text-center leading-none">
          <h2
            className="mb-4 text-[40px] font-[300] md:text-[60px]"
            data-aos="fade-up"
          >
            남들이 만드는
          </h2>
          <h1
            className="text-[60px] font-[700] md:text-[90px]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            나만의 위키
          </h1>
        </div>
        <div data-aos="fade-up" data-aos-delay="200">
          <LinkButton
            text="위키 만들기"
            link="/mypage"
            color="gray"
            className="h-[59px] w-[170px] text-[24px] font-bold"
          />
        </div>
        <div className="relative z-10" data-aos="fade-up" data-aos-delay="600">
          <Image
            alt="/"
            src={profile}
            className="mt-[44px] w-full max-w-[498px] md:mt-[54px]"
          />
        </div>
      </section>
    </SectionLayout>
  );
}

// MainSection

function MainSection() {
  return (
    <>
      <FeatureWrite />
      <FeatureShare />
      <FeatureView />
    </>
  );
}

type FeatureMessageProps = {
  header: string;
  FirstLine: string;
  SecondLine: string;
  MessagePosition?: "items-start" | "items-end";
  className?: string;
};

function FeatureMessage({
  header,
  FirstLine,
  SecondLine,
  MessagePosition,
  className,
}: FeatureMessageProps) {
  return (
    <div className={`flex flex-col ${MessagePosition}`}>
      <h1
        id="header"
        className="text-[10px] font-[700] text-green200 md:text-[20px] lg:text-[30px]"
        data-aos="fade-up"
      >
        {header}
      </h1>
      <p
        id="description"
        className={`${className} lg:md-[60px] mb-[5px] mt-[10px] text-[16px] font-[400] md:mb-[40px] md:mt-[20px] md:text-[32px] md:leading-[32px] lg:mt-[20px] lg:text-[50px] lg:leading-[57px]`}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {FirstLine} <br />
        {SecondLine}
      </p>
    </div>
  );
}

function FeatureWrite() {
  return (
    <SectionLayout bgColor="gray500" innerContainer wave={true}>
      <div className={styles.event_wrap}>
        <div className={styles.wave_box}>
          <div className={styles.wave}></div>
        </div>
      </div>
      <section
        id="feature/write-leftSide"
        className="flex items-end justify-center gap-[10px] md:gap-[20px] lg:gap-[40px]"
      >
        <div
          id="feature-write/left"
          // self-stretch 이게 필요한 거였구나
          className="flex flex-col justify-between self-stretch"
        >
          <FeatureMessage
            header="WRITE"
            FirstLine="친구의 위키,"
            SecondLine="직접 작성해 봐요"
            className="text-white"
          />
          <div data-aos="fade-up" data-aos-delay="300">
            <Image
              alt="/"
              src={keyboard}
              className="aspect-[364/450] max-h-[450px] w-full max-w-[364px] rounded-lg bg-[#4CBFA4]"
            />
          </div>
        </div>
        <div
          id="feature/write-rightSide"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Image alt="/" src={example1} className="w-full max-w-[520px]" />
        </div>
      </section>
    </SectionLayout>
  );
}

function FeatureShare() {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,
    cssEase: "linear",
    pauseOnHover: true,
    variableWidth: true,
    centerMode: true,
    afterChange: () => {
      AOS.refresh();
    },
  };
  const itemStyles =
    "relative h-[76px] w-[76px] md:h-[147px] md:w-[147px] lg:h-[360px] lg:w-[360px]";
  return (
    <SectionLayout bgColor="gray50" innerContainer={false}>
      <div
        id="inner-container"
        className="m-auto max-w-[1024px] p-[36px] md:p-[68px]"
      >
        <section id="feature-share" className="flex flex-col gap-5">
          <FeatureMessage
            header="SHARE"
            FirstLine="내 위키 만들고,"
            SecondLine="친구에게 공유해요"
            MessagePosition="items-end"
            className="items-end text-end text-gray500"
          />
        </section>
      </div>
      <div className={styles.slider_container}>
        <Slider {...settings}>
          <div className="m-[0_5px] md:m-[0_10px] lg:m-[0_35px]">
            <div className={itemStyles}>
              <Image alt="/" src={itemImage1} fill className="h-full w-full" />
            </div>
          </div>
          <div className="m-[0_5px] md:m-[0_10px] lg:m-[0_35px]">
            <div className={itemStyles}>
              <Image alt="/" src={itemImage2} fill className="h-full w-full" />
            </div>
          </div>
          <div className="m-[0_5px] md:m-[0_10px] lg:m-[0_35px]">
            <div className={itemStyles}>
              <Image alt="/" src={itemImage3} fill className="h-full w-full" />
            </div>
          </div>
          <div className="m-[0_5px] md:m-[0_10px] lg:m-[0_35px]">
            <div className={itemStyles}>
              <Image alt="/" src={itemImage4} fill className="h-full w-full" />
            </div>
          </div>
        </Slider>
      </div>
    </SectionLayout>
  );
}

function FeatureView() {
  return (
    <SectionLayout bgColor="gray10" innerContainer>
      <section id="feature/view" className="flex flex-col">
        <FeatureMessage
          header="VIEW"
          FirstLine="친구들이 달아준,"
          SecondLine="내용을 확인해 봐요"
        />
        <div className="mb-[10px] mt-[40px] md:mb-[22px] md:mt-[80px] lg:mb-[40px] lg:mt-[120px]">
          <Image alt="/" src={example2} />
        </div>
        <div className="flex justify-between gap-[10px] md:gap-[20px] lg:gap-[40px]">
          <div>
            <Image
              alt="/"
              src={bell}
              className="max-h-[280px] w-full min-w-0 max-w-[280px] rounded-2xl bg-[#8E66FF]"
            />
          </div>
          <div>
            <Image
              alt="/"
              src={example3}
              className="max-h-[280px] w-full min-w-0 max-w-[604px]"
            />
          </div>
        </div>
      </section>
    </SectionLayout>
  );
}

// BottomSection

function BottomSection() {
  return (
    <SectionLayout bgColor="gray500" innerContainer={true}>
      <section className="flex flex-col items-center justify-between gap-[40px]">
        <h1 className="text-[30px] leading-none text-white md:text-[60px]">
          나만의 위키 만들어 보기
        </h1>
        <div>
          <LinkButton
            text="지금 시작하기"
            color="white"
            link="/mypage"
            className="h-[54px] w-[160px] rounded-2xl border-none bg-white text-[20px] font-[700] text-gray500"
          />
        </div>
      </section>
    </SectionLayout>
  );
}

// Footer

function Footer() {
  return (
    <div className="bg-gray600 px-[20px] py-[40px] text-gray500 md:px-[48px] md:py-[60px] lg:p-[80px]">
      <div id="outer-container" className="m-auto max-w-[1920px]">
        <section className="text-white">
          <p className="text-[12px] font-[700] md:text-[16px]">
            Copyright ⓒ Wikied. All Rights Reserved
          </p>
          <p className="mb-[20px] mt-[10px] text-[11px] md:text-[14px]">
            사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 |
            대표 : 이지은 <br />
            서울특별시 중구 청계천로 123, 위키드빌딩
          </p>
          <div className="flex gap-[15px] text-[11px] md:gap-[30px] md:text-[14px]">
            <p>서비스 이용약관</p>
            <p>개인정보 취급방침</p>
            <p>전자금융거래 기본약관</p>
          </div>
        </section>
      </div>
    </div>
  );
}
