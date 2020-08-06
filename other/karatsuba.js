function karatsuba(num1, num2) {
    if (num1 == 0 || num2 == 0) return 0n;

    let len1 = numDigits(num1);
    let len2 = numDigits(num2);

    if (len1 == 1 && len2 == 1)
    {
        return num1*num2;
    }

    let diff = BigInt(Math.abs(len1 - len2));

    if (len1 < len2) { num1 *= 10n**diff; }
    else if (len1 > len2) { num2 *= 10n**diff; }

    
    let len = BigInt(len1);
    if (len % 2n != 0) {
        num1 *= 10n;
        num2 *= 10n;
        diff += 2n;
        len++;
    }

    let halfLength = len/2n;

    let a = num1 / 10n**halfLength;
    let b = num1 % 10n**(len -  halfLength);
    let c = num2 / 10n**halfLength;
    let d = num2 % 10n**(len -  halfLength);

    let ac = karatsuba(a, c);
    let bd = karatsuba(b, d);

    let product = karatsuba(a+b, c+d)

    let adPlusbc = product - ac - bd;
    return ((10n**len)*ac + (10n**halfLength)*adPlusbc + bd) / 10n**diff;
}


function numDigits(x) {
  return String(x).length;
}

const std = BigInt(3141592653589793238462643383279502884197169399375105820974944592)*
BigInt(2718281828459045235360287471352662497757247093699959574966967627);

const kar = karatsuba(BigInt(3141592653589793238462643383279502884197169399375105820974944592),
          BigInt(2718281828459045235360287471352662497757247093699959574966967627));

console.log("Standard: " + std + "\n\nKaratsuba: " + kar);
console.log("Equal? " + String(std == kar));