const xml2js=require('xml2js')
const parser=new xml2js.Parser({explicitArray:false})

describe('XML Parsing', () => {
    const xmlPayload="<Pet>     <id>0</id>     <Category>         <id>0</id>         <name>Dog</name>     </Category>     <name>Jimmy</name>     <photoUrls>         <photoUrl>string</photoUrl>     </photoUrls>     <tags>         <Tag>             <id>0</id>             <name>string</name>         </Tag>     </tags>     <status>available</status> </Pet>"
    let petid=null;
    before('Creating PET',() => {
        cy.request({
            method:"POST",
            url:'https://petstore.swagger.io/v2/pet',
            body:xmlPayload,
            headers:{'Content-Type':"application/xml",'accept':"application/xml"}
        })
        .then((response)=>{
           expect(response.status).to.eq(200)
           parser.parseString(response.body,(err,result)=>{
            petid=result.Pet.id
            expect(result.Pet.name).to.equal("Jimmy")
            expect(result.Pet.id).to.equal("9223372036854775807")

           }) 
        })
    })

    it('Creating PET',() => {
        cy.request({
            method:"GET",
            url:'https://petstore.swagger.io/v2/pet/'+petid,
            body:xmlPayload,
            headers:{'accept':"application/xml"}
        })
        .then((response)=>{
           expect(response.status).to.eq(200)
           parser.parseString(response.body,(err,result)=>{
            expect(result.Pet.name).to.equal("Jimmy")

           }) 
        })
    })


})