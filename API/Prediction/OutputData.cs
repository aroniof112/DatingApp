

namespace API.Entities
{
   using Microsoft.ML.Data;

   public class OutputData
    {
        [ColumnName("PredictedLabel")]
        public string Prediction { get; set; }
        public float[] Score { get; set; }
    }
}