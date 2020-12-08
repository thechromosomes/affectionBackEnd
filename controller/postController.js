module.exports.postContent = async (req, res) => {

    const Posts = require('../model/Posts')
    let {Heading_main, content, mention_name, wall_color, wall_style, tags, created_by} = req.body

    try {
        const postResponse = await Posts.create({
            Heading_main, content, mention_name, wall_color, wall_style, tags, created_by
        })

        console.log("postResponse", postResponse)
        res.status(200).send({
            "message": `your response is placed into data base`,
            "status": true,
            "error": null
        })
    } catch (error) {
        console.log("error", error.errors)
        res.status(400).send({
            "message": `please provide all the fields `,
            "status": false,
            "error": error.errors
        })
    }

}