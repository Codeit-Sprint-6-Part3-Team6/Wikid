import { Profile } from "@lib/types/Profile";

const infoKeyList: string[] = [
  "city",
  "mbti",
  "job",
  "sns",
  "birthday",
  "nickname",
  "bloodType",
  "family",
  "nationality",
];

const infoDictionary: { [key: string]: string } = {
  city: "거주 도시",
  mbti: "MBTI",
  job: "직업",
  sns: "SNS 계정",
  birthday: "생일",
  nickname: "별명",
  bloodType: "혈액형",
  family: "가족 관계",
  nationality: "국적",
};

const refineProfileInfo = (profile: Profile) => {
  const convertedProfile = Object.entries(profile); // 배열로 변경

  const filteredInfoList = convertedProfile.filter(
    (info): info is [string, string] => {
      //filter가 리턴하는 Boolean이 true면 info의 타입을 [string, string]으로 보장시키는 사용자 정의 타입가드
      return (
        infoKeyList.some((key) => key === info[0]) &&
        typeof info[1] === "string"
      );
    },
  ); // 필요한 정보들만 필터링

  const translatedInfoList = filteredInfoList.map((info) => {
    return [info[0], infoDictionary[info[0]], info[1]];
  });

  return translatedInfoList;
};

export default refineProfileInfo;
