## 数独游戏 (Sudoku Game)

一个简单的网页版数独游戏，支持多种难度级别和游戏辅助功能。

## 功能特点

-   三种难度级别（简单、中等、困难）
-   实时完成度显示
-   提示功能
-   即时反馈（正确/错误提示）
-   新游戏生成
-   答案查看

## 本地运行

1.  克隆项目到本地：
    
    ```
    git clone [项目地址]
    ```
    
2.  安装依赖：
    
    ```
    npm install
    ```
    
3.  启动本地服务器：
    
    ```
    npm run serve
    ```
    
4.  在浏览器中访问 `http://localhost:3000`

## 游戏规则

1.  每行、每列和每个 3x3 的方格中都必须包含 1-9 的数字，且不能重复
2.  点击空白格子可以输入数字
3.  输入正确时格子变绿色
4.  输入错误时格子变红色
5.  完成所有格子后会显示祝贺信息

## 游戏功能说明

### 难度级别

-   简单：移除 30 个数字
-   中等：移除 40 个数字
-   困难：移除 50 个数字

### 按钮功能

-   新游戏：重新生成一个新的数独题目
-   提示：自动填写一个空格子
-   放弃：显示完整解答

### 完成度显示

-   右上角显示当前完成进度
-   计算公式：已完成格子数 / 总需填写格子数 100%

## 技术栈

-   HTML5
-   CSS3
-   JavaScript (ES6+)

## 项目结构

```
sudoku/

 index.html      # 主页面
 style.css       # 样式文件
 script.js       # 游戏逻辑
 package.json    # 项目配置
 README.md       # 项目说明
```

## 开发说明

### 主要类

1.  **Sudoku 类**
    -   负责数独的生成和验证
    -   维护游戏板和解决方案
2.  **GameController 类**
    -   处理游戏逻辑
    -   管理用户交互
    -   更新界面显示

## 贡献指南

1.  Fork 本项目
2.  创建新的功能分支
3.  提交更改
4.  发起 Pull Request

## 待优化功能

-   添加计时功能
-   增加得分系统
-   添加历史记录
-   支持移动端适配
-   添加更多动画效果

## 许可证

[MIT License](http://localhost:3000/LICENSE)

## 联系方式

如有问题或建议，欢迎提出 Issue 或 PR。