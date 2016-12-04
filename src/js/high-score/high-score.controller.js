function HighScoreController(ScoreService) {

    let highScores = [];

    this.$onInit = () => {
        ScoreService.getScores()
            .then((scores) => setTable(scores))
            .catch(error => console.error(error));
    };

    function setTable(scores) {
        for (let entry of Object.values(scores)) {
            highScores.push(entry);
        }
    }

    Object.assign(this, {
        highScores
    });

}

HighScoreController.$inject = ['ScoreService'];
export default HighScoreController;