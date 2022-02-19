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

    suite("2 - American English Translation Tests", function () {
        test("2.1 - Translate `We watched the footie match for a while.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("We watched the footie match for a while.")[0],
                "We watched the soccer match for a while."
            );
        });

        test("2.2 - Translate `Paracetamol takes up to an hour to work.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("Paracetamol takes up to an hour to work.")[0],
                "Tylenol takes up to an hour to work."
            );
        });

        test("2.3 - Translate `First, caramelise the onions.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("First, caramelise the onions.")[0],
                "First, caramelize the onions."
            );
        });

        test("2.4 - Translate `I spent the bank holiday at the funfair.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("I spent the bank holiday at the funfair.")[0],
                "I spent the public holiday at the carnival."
            );
        });

        test("2.5 - Translate `I had a bicky then went to the chippy.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("I had a bicky then went to the chippy.")[0],
                "I had a cookie then went to the fish-and-chip shop."
            );
        });

        test("2.6 - Translate `I've just got bits and bobs in my bum bag.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("I've just got bits and bobs in my bum bag.")[0],
                "I've just got odds and ends in my fanny pack."
            );
        });

        test("2.7 - Translate `The car boot sale at Boxted Airfield was called off.` to American English", function () {
            assert.equal(
                translator.toAmericanEnglish("The car boot sale at Boxted Airfield was called off.")[0],
                "The swap meet at Boxted Airfield was called off."
            );
        });

        test("2.8 - Translate `Have you met Mrs Kalyani?` to American English", function () {
            assert.equal(translator.toAmericanEnglish("Have you met Mrs Kalyani?")[0],
                "Have you met Mrs. Kalyani?"
            );
        });

        test("2.9 - Translate `Prof Joyner of King's College, London.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("Prof Joyner of King's College, London.")[0],
                "Prof. Joyner of King's College, London."
            );
        });

        test("2.10 - Translate `Tea time is usually around 4 or 4.30.` to American English", function () {
            assert.equal(translator.toAmericanEnglish("Tea time is usually around 4 or 4.30.")[0],
                "Tea time is usually around 4 or 4:30."
            );
        });
    });

    suite("3 - Translation Highlighting Tests", function () {
        test("3.1 - Highlight translation in `Mangoes are my favorite fruit.`", function () {
            assert.equal(translator.toBritishEnglish("Mangoes are my favorite fruit.")[1],
                'Mangoes are my <span class="highlight">favourite</span> fruit.'
            );
        });

        test("3.2 - Highlight translation in `I ate yogurt for breakfast.`", function () {
            assert.equal(translator.toBritishEnglish("I ate yogurt for breakfast.")[1],
                'I ate <span class="highlight">yoghurt</span> for breakfast.'
            );
        });

        test("3.3 - Highlight translation in `We watched the footie match for a while.`", function () {
            assert.equal(translator.toAmericanEnglish( "We watched the footie match for a while.")[1],
                'We watched the <span class="highlight">soccer</span> match for a while.'
            );
        });

        test("3.4 - Highlight translation in `Paracetamol takes up to an hour to work.`", function () {
            assert.equal(translator.toAmericanEnglish("Paracetamol takes up to an hour to work.")[1],
                '<span class="highlight">Tylenol</span> takes up to an hour to work.'
            );
        });
    });
});