const dotenv = require('dotenv/config')
const cloudinary = require ('cloudinary').v2

cloudinary.config({
    cloud_name: 'edusilva',
    api_key: '458947415156863',
    api_secret: 'QNzDZ1EAGkX5wkQUr7wvE5An9Vw'
});

let up = {}

const img_options = {width: 150, height: 150, crop: 'thumb', format: 'png'}

module.exports = {

    async uploads(req, res) {
        const { nome_user, urlfoto_user } = req.body

        await cloudinary.uploader.upload(`${urlfoto_user}`, {
            tags: "foto de perfil dos usuários",
            public_id: `${nome_user}`,
            folder:"sra/users",
            transformation: img_options,
        }, function (err, image) {
            console.log("** File Upload **")
            if (err) { console.warn(err) }
            //console.log(image)
            //console.log(nome_user)
            //console.log("* " + image.public_id)
            //console.log("* " + image.url)
            up = image
        })
        return res.json(up.url)
    }

}

