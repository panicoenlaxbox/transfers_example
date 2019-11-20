using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Transfers.Models
{
    public class PointOfSaleResult
    {
        public IEnumerable<PointOfSale> Data { get; set; }
        public int TotalRecords { get; set; }
    }
    public class PointOfSale
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public PointOfSale(int id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}
