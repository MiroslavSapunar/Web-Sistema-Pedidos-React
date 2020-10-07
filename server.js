const express = require('express')
const app = express()
const bcrytp = require('bcrypt')
const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/',(request, response) =>{
    response.render('index.ejs')
})

app.get('/login',(request, response) =>{
    response.render('login.ejs')
})

app.post('/login', (request , respond) =>{

})

app.get('/register',(request, response) =>{
    response.render('register.ejs')
})

app.post('/register', async (request , respond) =>{
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: request.body.name,
            email:request.body.email,
            password: hashedPassword
        })
        respond.redirect('/login')
    } catch {
        respond.redirect('/register')
    }
})


app.listen(3000)