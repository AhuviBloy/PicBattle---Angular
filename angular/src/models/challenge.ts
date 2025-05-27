// export class Challenge{
//     constructor(
//         public id: number, // מזהה אתגר
//         public title: string, // שם האתגר8
//         public description: string, // תיאור האתגר8
//         public startDate: Date, // תאריך התחלה8
//         public endDate: Date, // תאריך סיום8
//         public winnerCreationId?: number, // מזהה היצירה הזוכה
//         public countCreations: number = 0, // כמות היצירות שהועלו לאתגר
//         public isDeleted: boolean = false, // האם האתגר נמחק
//         public createdAt: Date = new Date() // תאריך יצירה (ברירת מחדל: עכשיו)
//     ){}
// }


export interface Challenge {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }