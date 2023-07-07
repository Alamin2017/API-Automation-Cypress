describe('API Chaining', () => {

    it('Getting all the posts', () => {
        cy.request({
            method:'GET',
            url:'https://jsonplaceholder.typicode.com/posts'
        })
        .then((response)=>{
            expect(response.status).to.eql(200)
            const postid=response.body[0].id
            return postid
        })
        .then((postid)=>{
            cy.request({
                method:'GET',
                url:'https://jsonplaceholder.typicode.com/comments?postId=${postid}'
            })
            .then((response)=>{
                expect(response.status).to.eql(200)

            })
        })
    })


    
})