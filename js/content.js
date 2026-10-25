(function(root){
'use strict';
const phases=['Arithmetic confidence','Basic BODMAS','Number structure','Fractions','Integers','Consolidation'];
const rows=[
['number','Number sense','Read each digit by its place. A zero holds an empty place.','In 4,307, the 3 means 300.','Round to the nearest ten by checking the ones digit.'],
['add','Add with confidence','Line up place values. Add ones, then tens; exchange ten ones for one ten.','38 + 27 = 38 + 20 + 7 = 65.','Check that the answer is larger than either positive addend.'],
['sub','Subtract with confidence','Line up place values. Exchange a ten when there are not enough ones.','52 − 28 = 52 − 20 − 8 = 24.','Add the answer to the smaller number to check.'],
['tables','Tables: 2, 5 and 10','Multiplication counts equal groups. Start with familiar table patterns.','5 × 6 = 30, so 6 × 5 = 30.','The order of factors does not change the product.'],
['tables','Tables: 3, 4 and 6','Build a new fact from one you know. Double the 3 times table to get the 6 times table.','6 × 7 = 2 × 21 = 42.','Four equal groups are double, then double again.'],
['tables','Tables: 7, 8 and 9','Use a nearby known fact to find an unfamiliar one.','9 × 7 = 10 × 7 − 7 = 63.','Eight equal groups are double, double, then double again.'],
['mul','Multiply in parts','Split a number into tens and ones. Multiply each part, then add.','23 × 4 = 80 + 12 = 92.','Estimate first: 23 × 4 is near 20 × 4.'],
['div','Divide into equal groups','Division asks how many equal groups or how many in each group.','42 ÷ 6 = 7 because 6 × 7 = 42.','Check division with multiplication.'],
['relation','Fact families','One multiplication fact gives two division facts.','8 × 6 = 48; 48 ÷ 8 = 6; 48 ÷ 6 = 8.','A missing factor can be found by division.'],
['order','Operation order','Do multiplication and division before addition and subtraction.','7 + 3 × 4 = 7 + 12 = 19.','Do not simply work from the left when operations have different priority.'],
['brackets','Brackets first','Work inside brackets first. Then follow operation order.','(7 + 3) × 4 = 10 × 4 = 40.','Brackets can change an answer.'],
['mixedOrder','BODMAS together','Brackets first; then multiply or divide left to right; then add or subtract left to right.','24 ÷ 4 × 2 = 6 × 2 = 12.','Division and multiplication have equal priority. So do addition and subtraction.'],
['factors','Factors and multiples','A factor divides a number exactly. A multiple is a whole-number product.','Factors of 12: 1, 2, 3, 4, 6, 12. Multiples of 4: 4, 8, 12…','Find factors in pairs: 1 × 12, 2 × 6, 3 × 4.'],
['prime','Primes and divisibility','A prime has exactly two positive factors. A composite has more than two.','13 is prime. 15 is composite because 3 × 5 = 15.','1 is neither prime nor composite.'],
['hcf','Highest common factor','List factors of both numbers. Choose their largest shared factor.','Factors shared by 12 and 18: 1, 2, 3, 6. HCF = 6.','The HCF cannot exceed the smaller number.'],
['lcm','Lowest common multiple','List positive multiples. Choose the first shared multiple.','Multiples of 4: 4, 8, 12. Of 6: 6, 12. LCM = 12.','The LCM is at least as large as the larger number.'],
['fractionParts','Meet fractions','The denominator counts equal parts in a whole. The numerator counts selected parts.','In 3/5, 5 equal parts make one whole and 3 are selected.','The parts must be equal in size.'],
['equivalent','Equivalent fractions','Multiply numerator and denominator by the same nonzero number.','2/3 = 4/6 because both parts were multiplied by 2.','Equivalent fractions name the same amount.'],
['simplify','Simplify fractions','Divide numerator and denominator by a shared factor until only 1 is shared.','12/18 = 2/3 by dividing both numbers by 6.','Use the HCF to simplify in one step.'],
['compareFraction','Compare fractions','With the same denominator, compare numerators. Otherwise use equal denominators.','2/3 = 4/6, so 2/3 > 3/6.','A larger denominator means smaller equal parts, not automatically a larger fraction.'],
['fractionAdd','Add and subtract fractions','Use a common denominator. Add or subtract numerators; keep that denominator.','1/2 + 1/3 = 3/6 + 2/6 = 5/6.','Never add the denominators. Simplify your answer.'],
['fractionMul','Multiply fractions','Multiply numerators and multiply denominators. Simplify the result.','2/3 × 3/4 = 6/12 = 1/2.','Cancel common factors across numerator and denominator before multiplying.'],
['fractionDiv','Divide fractions','Multiply by the reciprocal of the second fraction. The divisor must not be zero.','2/3 ÷ 1/4 = 2/3 × 4/1 = 8/3.','Invert only the second fraction.'],
['integerCompare','Meet integers','Numbers to the right on a number line are greater. Zero is neither positive nor negative.','−2 > −7 because −2 is farther right.','Among negative numbers, the one closer to zero is greater.'],
['integerAdd','Add and subtract integers','Adding a negative moves left. Subtracting a negative moves right.','−3 + 5 = 2; 4 − (−2) = 6.','Rewrite subtraction as adding the opposite.'],
['integerMul','Multiply and divide integers','Same signs give a positive product or quotient. Different signs give a negative one.','(−6) × (−3) = 18; 18 ÷ (−3) = −6.','The sign rule is for multiplication and division, not addition.'],
['mixedArithmetic','Arithmetic refresh','Choose a useful method, estimate, calculate, then check.','49 + 26 = 50 + 26 − 1 = 75.','Use the inverse operation to check.'],
['mixedOrder','Order and structure refresh','Pause to identify brackets and operation order before calculating.','18 − 12 ÷ 3 = 18 − 4 = 14.','Mark the first operation before you start.'],
['mixedFraction','Fractions and integers refresh','Name the operation first. Choose its rule before calculating.','3/4 − 1/2 = 1/4; −4 + 7 = 3.','Equal denominators are needed for addition, not multiplication.'],
['mastery','Foundation mastery check','Work carefully. A short test helps choose what to practise next.','6 + 2 × 5 = 16; 2/3 × 3/4 = 1/2.','Use mistakes to choose the next practice session.']];
const mental=[
['Make a ten','Addition','Move a small amount between addends to make ten.','8 + 7 = 10 + 5 = 15.'],
['Compensation','Addition and subtraction','Round one number, calculate, then undo the change.','49 + 28 = 50 + 28 − 1 = 77.'],
['Split numbers','Multiplication','Multiply each place-value part, then add.','24 × 3 = 60 + 12 = 72.'],
['Double and halve','Multiplication','Double one factor and halve the other; the product stays the same.','16 × 5 = 8 × 10 = 80.'],
['Multiply by 10 or 100','Place value','Move each digit one or two places to the left in place value.','34 × 100 = 3,400.','Do not use “add a zero” as a general rule for decimals.'],
['Related facts','Tables','Use a known table fact to build another.','7 × 6 = 5 × 6 + 2 × 6 = 42.'],
['Estimate first','Checking','Round to friendly numbers to predict the size of an answer.','198 + 403 is near 200 + 400 = 600.','An estimate is a check, not the exact answer.'],
['Undo subtraction','Checking','Add the difference to the number subtracted.','73 − 28 = 45; check 45 + 28 = 73.'],
['Undo division','Checking','Multiply the quotient by the divisor.','56 ÷ 8 = 7; check 7 × 8 = 56.'],
['Use one half','Fractions','One half means half the equal parts.','3/6 = 1/2 and 5/10 = 1/2.']];
const tips=[
['Divisible by 2, 5 or 10','Division','Check the last digit: even for 2; 0 or 5 for 5; 0 for 10.','340 is divisible by all three.'],
['Divisible by 3 or 9','Division','Add the digits. Check whether the sum is divisible by 3 or by 9.','234: 2 + 3 + 4 = 9, so 234 is divisible by 9 and 3.'],
['Divisible by 4','Division','Check only the last two digits. Hundreds are already divisible by 4.','316 is divisible by 4 because 16 is.'],
['Nine times a number','Tables','Multiply by ten, then subtract one group.','9 × 8 = 80 − 8 = 72.'],
['Subtract a friendly number','Subtraction','Subtract a nearby round number, then adjust back.','63 − 29 = 63 − 30 + 1 = 34.'],
['Factor pairs','Factors','Find the partner for each factor. Stop when pairs repeat.','18: 1 × 18, 2 × 9, 3 × 6.'],
['Simplify efficiently','Fractions','Divide both numerator and denominator by their HCF.','18/24 = 3/4.','Never cancel terms across addition or subtraction.'],
['Signs make a pattern','Integers','For multiplication or division, matching signs give positive; different signs give negative.','−5 × −2 = 10.','This does not describe addition. −5 + −2 = −7.'],
['Zero and one','Number sense','Adding zero leaves a number unchanged. Multiplying by one leaves it unchanged.','17 + 0 = 17; 17 × 1 = 17.','Division by zero is undefined.'],
['Equal priority, left to right','BODMAS','Multiplication and division share priority. Addition and subtraction share priority.','20 − 6 + 2 = 14 + 2 = 16.']];
const sessions=rows.map((r,i)=>({id:'S'+String(i+1).padStart(2,'0'),number:i+1,skill:r[0],title:r[1],teaching:r[2],example:r[3],fact:r[4],phase:i<9?0:i<12?1:i<16?2:i<23?3:i<26?4:5,mental:[6,0,7,5,5,5,2,8,8,2,2,6,5,5,8,5,9,9,9,9,9,3,8,6,1,5,1,6,9,6][i],tip:i%tips.length}));
const skills=Object.fromEntries(rows.map(r=>[r[0],r[1]]));skills.divisibility='Divisibility checks';skills.tables='Multiplication tables';skills.mixedOrder='Mixed BODMAS';
root.MFContent={phases,sessions,skills,mental,tips,levels:{A:'Very easy',B:'Basic',C:'Developing',D:'Strong practice',E:'Mixed revision'}};
})(typeof window!=='undefined'?window:globalThis);
