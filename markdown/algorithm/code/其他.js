// 
// 给定一个数组代表股票每天的价格，请问只能买卖一次的情况下，最大化利润是多少？
// 日期不重叠的情况下，可以买卖多次呢？
// 输入: [100, 80, 120, 130, 70, 60, 100, 125]
// 只能买一次：65（60 买进，125 卖出）
// 可以买卖多次: 115（80买进，130卖出；60 买进，126卖出）

//单次
var maxProfit = function(prices) {
    if(prices.length <= 1) return 0
    let minPrice = prices[0];
    let maxResult = 0;

    for(let i=1; i<prices.length; i++) {
        if(prices[i] < minPrice){
            minPrice = prices[i]
        }else if(maxResult < (prices[i]-minPrice)){
            maxResult = prices[i]-minPrice
        }
    }
    return maxResult
};
//多次
var maxProfit = function(prices) {
    if(prices.length <= 1) return 0
    let maxResult = 0;

    for(let i=1; i<prices.length; i++) {
        if(prices[i] < prices[i-1] > 0){
            maxResult = prices[i] < prices[i-1]
        }
    }
    return maxResult
};
 // 无重复的最大字串

 function countSting(s){
     let str = '';
     let len = 0;

     for(let i = 0; i < s.length; i++){
         if(str.indexOf(s[i])>-1){
            len = str.length > len ? str.length:len
            str = str.substring(str.indexOf(s[i])+1,str.length)
         }
            str += s[i]
     }
     return str.length > len?str.length:len
 }
//  最长公共前缀
var longestCommonPrefix = function(strs) {
    if(!strs.length) return ''
    if(strs.length === 1) return strs[0]

    let index = 0;
    let flag = true;
    while (flag){
       for(let i = 1;i<strs.length;i++){
           if(strs[i].length <= index){
               flag = false;
               break;
           }
           if(strs[i][index]!==strs[0][index]){
                flag = false;
                break;
           }
       }
        index++; 
    }
    return strs[0].substring(0, index-1)
};
//字符串的排列
var checkInclusion = function(s1, s2) {
    const len1 = s1.length
    const len2 = s2.length
    if(len1 > len2) return false;
    const obj = {}
    const obj2 = {}
    for(let i = 0; i < len1;i++){
        if(obj[s1[i]]){
            obj[s1[i]]++ 
        }else{
            obj[s1[i]] = 1
        }
        if(obj2[s2[i]]){
            obj2[s2[i]]++ 
        }else{
            obj2[s2[i]] = 1
        }
    }

    if(checkSame(obj,obj2)) return true

    for(let j = len1; j < len2;j++){
        if(obj2[s2[j]]){
            obj2[s2[j]]++
        }else{
            obj2[s2[j]]=1
        }
        obj2[s2[j-len1]]=obj2[s2[j-len1]]-1
        if(obj2[s2[j-len1]]===0) {
            delete obj2[s2[j-len1]]
        }
        if(checkSame(obj,obj2)) return true
    }

    return false

    function checkSame(obj1, obj2){
        if(Object.keys(obj1).length !== Object.keys(obj2).length) return false
        for(let o in obj1){
            if(!obj2[o]) return false
            if(obj1[o] !== obj2[o]) return false
        }
        return true
    }
};
//三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
// 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 1.排序 2.遍历，双指针 3.num[i]>0 结束。num[i]===num[i-1] 跳过
var threeSum = function(nums) {
    let len = nums.length
    if(!nums || len < 3) return []
    const result = []
    nums=nums.sort((a,b)=>{
        return a - b
    })
    for(let i=0;i<len;i++){
        if(nums[i]>0) break;
        if(nums[i] === nums[i-1])continue;
        let target = -nums[i]
        let k = i+1;
        let j = len -1;
        while(k < j){
            if(nums[k]+nums[j] === target){
                result.push([nums[i],nums[k],nums[j]])
                k++
                j--
                while(nums[k] === nums[k-1]){
                    k++
                }
                while(nums[j] === nums[j+1]){
                    j--
                }
            }
            if(nums[k]+nums[j] > target){
                j--;
            }
            if(nums[k]+nums[j] < target){
                k++;
            }
        }
    }
    return result;
}

//字符串相乘
//给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式
//思路，从后往前开始，num[i]*num[j]的结果在，res[i+j],res[i+j+1]上面
var multiply = function(num1, num2) {
    if(num1 === '0'||num2 === '0')return '0'
    let len1 = num1.length
    let len2 = num2.length
    let result = new Array(len1+len2).fill(0)

    for(let i = len1-1; i >= 0;i--){
        for(let j = len2-1; j >= 0;j--){
            let sum = result[i+j+1]+Number(num1[i])*Number(num2[j])
            result[i+j+1] = sum%10
            result[i+j] += Math.floor(sum/10)
        }
    }
    
    let str = '';
    let flag = false;
    for(let i=0;i<result.length;i++){
        if(result[i] !== '0' && !flag){
            flag = true;
        }
        if(flag){
            str += result[i]
        }
    }
    return str
};
//翻转字符串里的单词