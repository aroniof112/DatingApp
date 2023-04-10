
namespace API.Entities
{
   using Microsoft.ML.Data;
   using System.Runtime.Serialization;
   
   [DataContract]
   public class InputData
    {
        [ColumnName(@"HeartDisease")]
        public string HeartDisease { get; set; }

        [ColumnName(@"BMI")]
        public float BMI { get; set; }

        [ColumnName(@"Smoking")]
        public bool Smoking { get; set; }

        [ColumnName(@"AlcoholDrinking")]
        public string AlcoholDrinking { get; set; }

        [ColumnName(@"Stroke")]
        public bool Stroke { get; set; }

        [ColumnName(@"PhysicalHealth")]
        public float PhysicalHealth { get; set; }

        [ColumnName(@"MentalHealth")]
        public float MentalHealth { get; set; }

        [ColumnName(@"DiffWalking")]
        public bool DiffWalking { get; set; }

        [ColumnName(@"Sex")]
        public string Sex { get; set; }

        [ColumnName(@"AgeCategory")]
        public float AgeCategory { get; set; }

        [ColumnName(@"Race")]
        public string Race { get; set; }

        [ColumnName(@"Diabetic")]
        public string Diabetic { get; set; }

        [ColumnName(@"PhysicalActivity")]
        public bool PhysicalActivity { get; set; }

        [ColumnName(@"GenHealth")]
        public string GenHealth { get; set; }

        [ColumnName(@"SleepTime")]
        public float SleepTime { get; set; }

        [ColumnName(@"Asthma")]
        public bool Asthma { get; set; }

        [ColumnName(@"KidneyDisease")]
        public bool KidneyDisease { get; set; }
    }

}