export type Code = string | string[] | undefined;

export type Profile = {
  id: number;
  code: string;
  image: null | string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
};

export type WikiForm = {
  securityQuestion: string;
  securityAnswer: string;
};

