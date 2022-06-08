
let str = '4	19532764	2022-01-19	367,480.00	356,776.70	3	10,703.30	2022-01-19	结算款（不含质保金）	false	1			false'
str = str.replace(' ', '')
str = str.replace(',', '')
const arr = str.split(/\s/)
console.log(arr[1])
console.log(arr[2])
console.log(arr[3])
console.log(arr)
