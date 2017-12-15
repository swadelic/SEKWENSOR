function onLoad() {

    //Create Nexus UI objects
    var scope = new Nexus.Oscilloscope('#scope',{
      'size': [300,100]
    })
    var synsek = new Nexus.Sequencer('#synsek',{
      'size': [300,100],
      'mode': 'toggle',
      'rows': 7,
      'columns': 16
    })
    var drumsek = new Nexus.Sequencer('#drumsek',{
      'size': [300,100],
      'mode': 'toggle',
      'rows': 5,
      'columns': 16
    })
    var play = new Nexus.TextButton('#play',{
      'size': [147.5,50],
      'state': false,
      'text': 'Play',
      'alternate': false
    })
    var pause = new Nexus.TextButton('#pause',{
      'size': [147.5,50],
      'state': false,
      'text': 'Pause',
      'alternate': false
    })

    var synth = new Tone.Synth().toMaster();

    //Loads drum sound files
    var bd = new Audio("audio/bd.wav");
    var ch = new Audio("audio/ch.wav");
    var oh = new Audio("audio/oh.wav");
    var rs = new Audio("audio/rs.wav");
    var sd = new Audio("audio/sd.wav");
    var drums = [bd, rs, sd, ch, oh];

    var cbluesscale = ['C4', 'Eb4', 'F4', 'Gb4', 'G4', 'Bb4', 'C4'];

    //Step functions for sequencers
    synsek.on('step',function(x) {
      for (i = 0; i < 7; i++){
        if (x[i] == 1){
          synth.triggerAttackRelease(cbluesscale[i], '16n')
        }
      }
    })
    drumsek.on('step',function(x) {
      console.log(x[i]);
      for (i = 0; i < 5; i++){
        if (x[i] == 1){
          drums[i].pause();
          drums[i].currentTime = 0;
          drums[i].play();
        }
      }
    })

    //Button clicks
    $('#play').click(function(){
      synsek.start(100);
      drumsek.start(100);
    })
    $('#pause').click(function(){
      synsek.stop();
      drumsek.stop();
    })

}

window.onload = onLoad;
