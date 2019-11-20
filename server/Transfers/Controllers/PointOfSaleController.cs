using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Transfers.Models;

namespace Transfers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointOfSaleController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<PointOfSaleResult> Get(int first = 0, int rows = 10, string name = null)
        {
            IEnumerable<PointOfSale> data;
            using (var reader = new StreamReader("PointOfSale.json"))
            {
                var content = reader.ReadToEnd();
                data = JsonConvert.DeserializeObject<List<PointOfSale>>(content);
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                data = data.Where(pos => pos.Name.Contains(name));
            }

            data = data.OrderBy(p => p.Name);

            return new PointOfSaleResult()
            {
                Data = data.Skip(first).Take(rows),
                TotalRecords = data.Count()
            };
        }
    }
}
