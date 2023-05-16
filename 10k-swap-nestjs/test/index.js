// import { ChainId, Token } from '10k_swap-sdk'

// const token = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000000000000000000000000000001', 18, 'HOT', 'Caffeine')
// console.log(token)


// import { ChainId, Token } from '10k_swap-sdk'
import { ChainId, Token, TokenAmount, Pair } from 'l0k_swap-sdk'      // 坑爹啊，复制官方文档的代码进行安装和执行居然失败了。原因是：官方文档中 package 名称为“10k_swap-sdk”（数字 1），而实际安装之后，node_modules 中的文件夹名称为“l0k_swap-sdk”（小写字母 l）。
console.log(`The chainId of mainnet is ${ChainId.MAINNET}.`)
const HOT = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000000000000000000000000000001', 18, 'HOT', 'Caffeine')
const NOT = new Token(ChainId.MAINNET, '0x0000000000000000000000000000000000000000000000000000000000000002', 18, 'NOT', 'Caffeine')

const pair = new Pair(new TokenAmount(HOT, '2000000000000000000'), new TokenAmount(NOT, '1000000000000000000'))

console.log(pair.tokenAmounts)
