class profileController{
    static async index(req, res) {
        try {
            const user = req.student;
            return res.json({status: 200, user})
        
        } catch (error) {
            return res.status(500).json({message: "Something went wrong"})
        }
        
    }

    static async store() {
        
    }

    static async show() {
        
    }

    static async update() {
        
    }

    static async destroy() {
        
    }
}


export default profileController;