// 教示

var instruction = {

type: 'html-keyboard-response',

stimulus: 'これからキー押し課題を行ってもらいます。<br>' +

          '「L」「R」がランダムに表示されるので，<br><br>' +

          '「L」が表示されたら左手人差し指で f キー<br>'+

          '「R」が表示されたら右手人差し指で j キー<br><br>' +

          'を押してください。<br>' +

          '準備ができたらいずれかのキーを押して課題を始めてください。',

}



var go_practice = {

type: 'html-keyboard-response',

stimulus: 'まず課題の練習を行います。<br>' +

          '左手と右手の人差指を それぞれ f, j キーの上においてください。<br><br>' +

          '準備ができたらいずれかのキーを押して課題を始めてください。',

post_trial_gap: 1000

}



var go_main = {

type: 'html-keyboard-response',

stimulus: 'まず本番を行います。<br>' +

          '左手と右手の人差指を それぞれ f, j キーの上においてください。<br><br>' +

          '準備ができたらいずれかのキーを押して課題を始めてください。',

post_trial_gap: 1000

}







// 注視点

var fixation = {

type: 'html-keyboard-response',

stimulus: "+",

choices: jsPsych.NO_KEYS,

trial_duration: 1000,

post_trial_gap: 1000,

}





// サイモン課題

var trial_types = [

{letter: 'L', pos: 'left', cond: 'cong'},

{letter: 'R', pos: 'left', cond: 'incong'},

{letter: 'L', pos: 'right', cond: 'incong'},

{letter: 'R', pos: 'right', cond: 'cong'},

];



var trial = {

type: 'html-keyboard-response',

stimulus: function() {

  return '<div class="text_' + jsPsych.timelineVariable('pos', true) + '">' + jsPsych.timelineVariable('letter', true) + '</div>'

},

choices: ['f', 'j'],

trial_duration: 1000,

post_trial_gap: 1000, // ITI

data: {

  letter: jsPsych.timelineVariable('letter'),

  pos: jsPsych.timelineVariable('pos'),

  cond: jsPsych.timelineVariable('cond')

},

on_finish: function(data) {

  data.key = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)

  if (data.letter == 'L') {

    data.correct = Number(data.key == 'f')

  } else {

    data.correct = Number(data.key == 'j')

  }

}

}



trial_types_practice = jsPsych.randomization.repeat(trial_types, 2);

trial_types_main = jsPsych.randomization.repeat(trial_types, 2);



// それぞれをtimeline_variablesに指定したブロックを作成する

var simon_practice = {

timeline_variables: trial_types_practice,

timeline:[trial]

}

var simon_main = {

timeline_variables: trial_types_main,

timeline: [trial],

}