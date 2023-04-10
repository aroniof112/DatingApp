using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using Microsoft.ML;

namespace API.Controllers
{
    public class PredictController : BaseApiController
    {
        private readonly ILogger<PredictController> _logger;
        private readonly MLContext _mlContext;
        private readonly PredictionEnginePool<InputData, OutputData> _predictionEnginePool;

        public PredictController(PredictionEnginePool<InputData, OutputData> predictionEnginePool, MLContext mlContext , ILogger<PredictController> logger)
        {
            _mlContext = mlContext;
            _logger = logger; 
            _predictionEnginePool = predictionEnginePool;
        }

        [HttpPost("prediction")]
        public ActionResult<OutputData> GetHeartResult([FromBody] InputData inputData)
        {
            if (inputData == null) return BadRequest("input data null");
            //Call the Class Prediction

            var predictionEngine = _predictionEnginePool.GetPredictionEngine();

            var prediction = predictionEngine.Predict(inputData);

            if(prediction == null) return BadRequest("prediction data null");

            var scorePercentages = prediction.Score;

            return Ok(prediction);
        }

    }
}