import requests, json
class API():
    def __init__(self,baseUrl):
        self.baseUrl = baseUrl
    def getLunchProvider(self):
        return requests.get(f"{self.baseUrl}/lunchProvider").json()
    def getLunchData(self):
        return requests.get(f"{self.baseUrl}/lunchOffer").json()
    def getDic(self):
        rt ={}
        providers = self.getLunchProvider()
        meals = self.getLunchData()

        for provider in providers:
            rt[provider["name"]] = []
        for meal in meals:
            rt[providers[meal["provider"]-1]["name"]].append(meal["name"])
        return rt

# --> essen /api/v2/lunchOffer`
# --> provider /api/v2/lunchProvider`
# +/[id] --> abrufen nur einer id
 

if __name__ == "__main__":
    api = API("https://lunchbox.rori.info/api/v2")
    offer = api.getLunchData()
    #with open("./sampleOffer.json","w") as file:
    #    file.write(json.dumps(offer,indent = 2))
    sum = 0
    for meal in offer:
        for e in meal["tags"]:
            sum +=1
        if len(meal["tags"]) == 0:
            sum +=1
    print(sum)
    '''
    for meal in offer:
        if(meal["description"]== ""):
            name = meal["name"]
            id = meal["id"]
            print(f"{name} mit der id {id}")
    '''

