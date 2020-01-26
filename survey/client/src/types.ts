
export type questionOptions= string[]
export type question = {options: questionOptions;descr: string};
export type questions=question[]
export type QuestionConfig={ids: number[]; questions: questions};

export type questionResult= number[]
export type answerRequest={id: number;answers: questionResult};

export type statusResponse={all: number; curr: number};