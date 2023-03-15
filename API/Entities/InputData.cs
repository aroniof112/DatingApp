using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.ML.Data;

namespace API.Entities
{
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