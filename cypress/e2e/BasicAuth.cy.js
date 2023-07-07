describe('Authentication', () => {
    it('Basic Authentication', () => {
        cy.request({
            method:'GET',
            url:'https://postman-echo.com/basic-auth',
            auth:{
                user:'postman',
                pass:'password'
            }
        })
        .then((response)=>{

            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eql(true)
        })
    })

    it('Digest Authentication', () => {
        cy.request({
            method:'GET',
            url:'https://postman-echo.com/basic-auth',
            auth:{
                username:'postman',
                password:'password',
                method:'digest'
            }
        })
        .then((response)=>{

            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eql(true)
        })
    })

    

    it('Bearer Authentication', () => {
        const token='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'
        cy.request({
            method:'GET',
            url:'https://api.github.com/user/repos',
            headers:{
                authorization:'Bearer '+token
            }
        })
        .then((response)=>{

            expect(response.status).to.eq(200)
        
        })
    })
})