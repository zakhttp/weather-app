module.exports = function(theme){

  colorThemes = {
    defaultTheme: {
      background: {
        backgroundColor: '#FFFFFF'
      },
      foreground: {
        color: '#4A5758'
      },
      primary: {
        color: '#1FA69D'
      },
      secondary: {
        color: '#1DD3B0'
      }
    },
    warm: {
      background: {
        backgroundColor: '#F5EED7'
      },
      foreground: {
        color: '#736A51'
      },
      primary: {
        color: '#BF3B3B'
      },
      secondary: {
        color: '#FF9F29'
      }
    },
    fresh: {
      background: {
        backgroundColor: '#F1F1F1'
      },
      foreground: {
        color: '#19DFE8'
      },
      primary: {
        color: '#38F6CB'
      },
      secondary: {
        color: '#38F6CB'
      }
    },
    tonic: {
      background: {
        backgroundColor: '#FDFFFC'
      },
      foreground: {
        color: '#011627'
      },
      primary: {
        color: '#F71735'
      },
      secondary: {
        color: '#04508E'
      }
    },
    rainy: {
      background: {
        backgroundColor: '#E4FDE1'
      },
      foreground: {
        color: '#575761'
      },
      primary: {
        color: '#8ACB88'
      },
      secondary: {
        color: '#648381'
      }
    }
  };

  return colorThemes[theme];
}
