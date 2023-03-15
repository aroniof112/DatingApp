using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.ML;

namespace API.Controllers
{
    public class PredictController : BaseApiController
    {
        private readonly ILogger<PredictController> _logger;
        private readonly MLContext _mlContext;
        private readonly PredictionEngine<InputData, OutputData> _predictionEngine;

        public PredictController(MLContext mlContext , ILogger<PredictController> logger)
        {
            _mlContext = mlContext;
            _logger = logger;
            
            var model = _mlContext.Model.Load("assets/MLModel1.zip", out var modelSchema);

             _predictionEngine = _mlContext.Model.CreatePredictionEngine<InputData, OutputData>(model);
        }

        [HttpPost("prediction")]
        public ActionResult<OutputData> GetWeather([FromBody] InputData inputData)
        {
            if (inputData == null) return BadRequest("input data null");
            //Call the Class Prediction
            var prediction = _predictionEngine.Predict(inputData);

            if(prediction == null) return BadRequest("prediction data null");

            var predictedValue = prediction.Prediction;

            var scorePercentages = prediction.Score
                .Select(score => (score * 1000).ToString("P0"))
                .ToArray();

            var response = new OutputData
            {
                Prediction = predictedValue
            };

            return Ok(response);
        }

    }
}