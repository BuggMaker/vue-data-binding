import * as D from '../src/index'

let model = {
    name: "Xiao Wang",
    age: 23,
    detailInfo: {
        height: 184,
        weight: 75
    }
};
D.observe(model);
model.age = 25;