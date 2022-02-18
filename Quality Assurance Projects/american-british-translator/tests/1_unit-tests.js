const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    suite("1 - British English Translation Tests", function () {
        test("1.1  - Translate `Mangoes are my favorite fruit.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("Mangoes are my favorite fruit.")[0],
                "Mangoes are my favourite fruit."
            );
        });

        test("1.2 - Translate `I ate yogurt for breakfast.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("I ate yogurt for breakfast.")[0],
                "I ate yoghurt for breakfast."
            );
        });

        test("1.3 - Translate `We had a party at my friend's condo.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("We had a party at my friend's condo.")[0],
                "We had a party at my friend's flat."
            );
        });

        test("1.4 - Translate `Can you toss this in the trashcan for me?` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("Can you toss this in the trashcan for me?")[0],
                "Can you toss this in the bin for me?"
            );
        });

        test("1.5 - Translate `The parking lot was full.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("The parking lot was full.")[0],
                "The car park was full."
            );
        });

        test("1.6 - Translate `Like a high tech Rube Goldberg machine.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("Like a high tech Rube Goldberg machine.")[0],
                "Like a high tech Heath Robinson device."
            );
        });

        test("1.7 - Translate `To play hooky means to skip class or work.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("To play hooky means to skip class or work.")[0],
                "To bunk off means to skip class or work."
            );
        });

        test("1.8 - Translate `No Mr. Bond, I expect you to die.` to British English", function () {
            assert.equal(translator.toBritishEnglish("No Mr. Bond, I expect you to die.")[0],
                "No Mr Bond, I expect you to die."
            );
        });

        test("1.9 - Translate `Dr. Grosh will see you now.` to British English", function () {
            assert.equal(translator.toBritishEnglish("Dr. Grosh will see you now.")[0],
                "Dr Grosh will see you now."
            );
        });

        test("1.10 - Translate `Lunch is at 12:15 today.` to British English", function () {
            assert.equal(
                translator.toBritishEnglish("Lunch is at 12:15 today.")[0],
                "Lunch is at 12.15 today."
            );
        });
    });
});