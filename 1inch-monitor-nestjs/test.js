
let str = '6	42386930 	2021-04-23	295,567.00	271,162.39	9	24,404.61	2021-04-23	结算款（不含质保金）	false	1			false'
str = str.replace(' ', '')
str = str.replace(',', '')
const arr = str.split(/\s/)
console.log(arr[1])
console.log(arr[2])
console.log(arr[3])
console.log(arr)
