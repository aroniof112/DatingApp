
namespace API.Entities
{
   using Microsoft.ML.Data;
   using System.Runtime.Serialization;
   
   [DataContract]
   public class InputData
    {
        [ColumnName("date"), LoadColumn(0), DataMember]
        public string Date { get; set; }

        [ColumnName("precipitation"), LoadColumn(1), DataMember]
        public float Precipitation { get; set; }

        [ColumnName("temp_max"), LoadColumn(2), DataMember]
        public float Temp_max { get; set; }

        [ColumnName("temp_min"), LoadColumn(3), DataMember]
        public float Temp_min { get; set; }

        [ColumnName("wind"), LoadColumn(4), DataMember]
        public float Wind { get; set; }

        [ColumnName("weather"), LoadColumn(5), DataMember]
        public string Weather { get; set; }
    }

}