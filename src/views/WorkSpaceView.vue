<script setup>
import TrainConsole from '@/components/TrainConsole.vue';

</script>

<template>
    <div style="height: 27px;"></div>
    <div class="title">本地数据处理</div>
    <div class="info">
        要制作训练数据，请打开项目中的 preprocess 文件夹。<br />
        其中 assets 目录中存放康复训练时拍下的视频，要求是 mp4 文件，数量不做限制，命名格式为 xxx_type.mp4 。<br />
        其中 type 为 0 代表出现代偿步态，1 代表未出现代偿步态，比如 left01_0.mp4 ，视频数据最好包含前、后、左、右四个视角。<br />
        将视频数据整理好后，在 preprocess 目录下使用命令：
        <pre>python mp4process.py --window_size=24</pre>
        其中 window_size 为窗口大小，一般设为 24 即可。程序执行完毕后，会将处理好的数据以 csv 格式存放在 rawdata 目录下。在 rawdata 目录下，还有 train 和 test 两个子目录，用于本地数据训练的训练集划分，请自行将处理好的数据存放至这两个目录中。<br />
        如果完成上述步骤，就可以进行本地数据训练了。
    </div>
    <div style="height: 27px;"></div>
    <div class="title">本地数据训练</div>
    <TrainConsole></TrainConsole>
    <div style="height: 27px;"></div>
    <div class="title">通过视频识别代偿行为</div>
</template>

<style scoped>
pre {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 17px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: rgb(30, 30, 30);
    color: #d4d4d4;
    border-radius: 4px;
}
.title {
    color: #2c3e50;
    font-family: 'SimSun', '宋体', serif;
    font-size: 20px;
    font-weight: bold;
    max-width: 1220px;
    margin: 0 auto;
}
.info{
    font-family: 'SimSun', '宋体', serif;
    background-color: #f9f9f9;
    padding: 16px;
    border-radius: 4px;
    line-height: 1.8;
    color: #222;
    font-size: 14px;
    max-width: 1220px;
    margin: 20px auto;
    border-radius: 4px;
}
</style>

