const express = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Customer, validateCustomer } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
});

router.post("/", [auth, validate(validateCustomer)], async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

router.put("/:id", [auth, validate(validateCustomer)], async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
        { new: true }
    );

    if (!customer)
        return res.status(404).send("The customer with given ID not found");

    res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer)
        return res.status(404).send("The customer with given ID not found");

    res.send(customer);
});

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer)
        return res.status(404).send("The customer with given ID not found");

    res.send(customer);
});

module.exports = router;
