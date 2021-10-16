const wallaby = require("./wallaby")
// @ponicode
describe("wallaby", () => {
    test("0", () => {
        let callFunction = () => {
            wallaby({ compilers: { babel: () => true }, testFramework: { configure: () => "George" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            wallaby({ compilers: { babel: () => false }, testFramework: { configure: () => "George" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            wallaby({ compilers: { babel: () => true }, testFramework: { configure: () => "Jean-Philippe" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            wallaby({ compilers: { babel: () => false }, testFramework: { configure: () => "Pierre Edouard" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            wallaby({ compilers: { babel: () => true }, testFramework: { configure: () => "Anas" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            wallaby(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
