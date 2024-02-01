import { labels } from "../../data/chart"

export const formatRevenue = (data: any) => {
   const newObject: any = {};
   labels.map((l) => {
     for (const key in data) {
       if (l === "January" && key === "1") {
         newObject[l] = data[key];
       }
       if (l === "February" && key === "2") {
         newObject[l] = data[key];
       }
       if (l === "March" && key === "3") {
         newObject[l] = data[key];
       }
       if (l === "April" && key === "4") {
         newObject[l] = data[key];
       }
       if (l === "May" && key === "5") {
         newObject[l] = data[key];
       }
       if (l === "June" && key === "6") {
         newObject[l] = data[key];
       }
       if (l === "July" && key === "7") {
         newObject[l] = data[key];
       }
       if (l === "August" && key === "8") {
         newObject[l] = data[key];
       }
       if (l === "September" && key === "9") {
         newObject[l] = data[key];
       }
       if (l === "October" && key === "10") {
         newObject[l] = data[key];
       }
       if (l === "November" && key === "11") {
         newObject[l] = data[key];
       }
       if (l === "December" && key === "12") {
         newObject[l] = data[key];
       }
     }
   });

  return newObject;
}