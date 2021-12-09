let mealData = [
    {
      tags: "vegan",
      name: "soup",
      price: "3.00",
      id: 1,
      comments: ["hi","nice","wild"]
    },
    {
      tags: "premium",
      name: "steak",
      price: "5.60",
      id: 2,
      comments: []  
    },
    {
      tags: "",
      name: "pommes frites",
      price: "2.50",
      id: 3,
      comments: []
    }
  ];
let providerData = [
    {
      name: "Call a Pizza",
      offer: mealData
    },
    {
      name: "Lieferando",
      offer: mealData
    },
    {
      name: "was",
      offer: mealData
    }
  ];
export default mealData;