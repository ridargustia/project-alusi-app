const List = require('../models/List');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
    index: async (req, res) => {
        try {
            //Select list berdasarkan user_id dari jwt auth-token
            const list = await List.find({user_id: req.user._id}).populate('products');
            //Checking jika data list kosong
            if (list.length == 0) return res.status(400).json({message: 'List is empty.'});
            //Menampilkan endpoint / response
            res.status(200).json({
                success: true,
                message: 'Request is successful.',
                data: list
            });
        } catch (error) {
            //Jika terjadi error
            res.status(400).json({message: error});
        }
    },
    store: async (req, res) => {
        const list = new List({
            user_id: req.body.user_id,
            title: req.body.title
        });

        try {
            const savedList = await list.save();
            const user = await User.findById(savedList.user_id);
            user.lists.push(savedList._id);
            await user.save();
            res.status(201).json({
                success: true,
                message: 'Created is successfull.',
                data: savedList
            });
        } catch (error) {
            res.status(400).json({message: error});
        }
    },
    storeProduct: async (req, res) => {
        try {
            //Variabel untuk menampung hasil checking
            let productExist = 0;
            let listExist = 0;
            //Queries select product berdasarkan id yg dikirim dari route parameter
            const product = await Product.findById(req.params.idProduct);
            //Select user berdasarkan id dari jwt header auth-token
            const user = await User.findById(req.user._id);
            //Mengambil salah satu data list yg dimiliki oleh seorang user
            const userHas = await user.lists.filter(user => user == req.params.idList);
            //Select list berdasarkan id dari list yang ditentukan sebelumnya
            const selectList = await List.findById(userHas[0]);
            //checking apakah produk di list tersebut sudah ada
            await selectList.products.forEach(prod => {
                //Jika sudah ada maka tambahkan variabel dengan angka 1, yg artinya data sudah ada sebelumnya 
                if (prod == req.params.idProduct) {
                    productExist = productExist + 1;
                } 
            });
            //jika data belum ada maka sistem dapat melakukan push ke properti produk dalam bentuk array
            if (productExist == 0) selectList.products.push(product._id);
            //Kemudian simpan hasil perubahan
            await selectList.save();
            //checking apakah produk di list tersebut sudah ada
            await product.lists.forEach(list => {
                //Jika sudah ada maka tambahkan variabel dengan angka 1, yg artinya data sudah ada sebelumnya
                if (list == req.params.idList) {
                    listExist = listExist + 1;
                } 
            });
            //jika data belum ada maka sistem dapat melakukan push ke properti produk dalam bentuk array
            if (listExist == 0) product.lists.push(selectList._id);
            //Kemudian simpan hasil perubahan
            await product.save();
            //tampilkan endpoint / response
            res.status(200).json({
                success: true,
                message: 'Store product to list is successful.',
                data: selectList
            });
        } catch (error) {
            //Jika terjadi error
            res.status(400).json({message: error});
        }
    }
};