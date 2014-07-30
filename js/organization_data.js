define(function(){
  return [
    {
      "name": "John Smith",
      "position": "President",
      "subordinates": [
        {
          "name": "Belinda Wilkins",
          "position": "VP Account Services",
          "subordinates": [
            {
              "name": "Effie Normanson",
              "position": "Account Supervisor",
              "subordinates": [
                { "name": "Zara Lynn", "position": "Account Executive" }
              ]
            },
            { "name": "Cece Jefferson", "position": "Account Supervisor" }
          ]
        },
        {
          "name": "Willa Marley",
          "position": "VP Creative Services",
          "subordinates": [
            { "name": "Jenn Granville", "position": "Art/Copy" },
            { "name": "Nicholas Jacobs", "position": "Production" }
          ]
        },
        {
          "name": "Cassius Spalding",
          "position": "VP Marketing Services",
          "subordinates": [
            { "name": "Alban Donalds", "position": "Media" },
            { "name": "Elly Parsons", "position": "Research" }
          ]
        }
      ]
    }
  ];
});
