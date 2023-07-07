describe('parsing JSON Response', () => {
    
    it('Parsing simple JSON response', () => {
        cy.request({
            method:'GET',
            url:'https://fakestoreapi.com/products',
        })
        .then((response)=>{
            expect(response.status).to.eql(200)
            expect(response.body[0].id).to.eql(1)
            expect(response.body[0].title).to.eql("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
            expect(response.body[0].price).to.eql(109.95)
            expect(response.body[0].rating.rate).to.eql(3.9)
            
        })

    })

    it('Parsing Complex JSON response', () => {
        let totalPrice=0;
        cy.request({
            method:'GET',
            url:'https://fakestoreapi.com/products',
            qs:{limit:3}
        })
        .then((response)=>{
            expect(response.status).to.eql(200)

            response.body.forEach(element =>{
                totalPrice=totalPrice+element.price;
            })
            expect(totalPrice).to.equal(188.24)
        
        })

    })
});