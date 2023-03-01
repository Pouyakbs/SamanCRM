using System;
using System.Collections.Generic;
using System.Text;

namespace SamanCRM.Shared.DomainModels.DTOs
{
    public class SupplierDTO
    {
        public int SupplierID { get; set; }
        public Guid SupplierGuid { get; set; }
        public string NickName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ContactFields { get; set; }
        public string Emails { get; set; }
        public string Website { get; set; }
        public string Attractiveness { get; set; }
        public string Status { get; set; }
        public string SupplierNum { get; set; }
        public string User { get; set; }
        public string Desc { get; set; }
        public string Industry { get; set; }
        public string SubIndustry { get; set; }
        public string EcoCode { get; set; }
        public string NationalNum { get; set; }
        public string SubNum { get; set; }
        public string BillSendGeoLoc { get; set; }
        public string BillCountry { get; set; }
        public string BillState { get; set; }
        public string BillCity { get; set; }
        public string BillPostalCode { get; set; }
        public string BillAddress { get; set; }
        public string BillLat { get; set; }
        public string BillLong { get; set; }
        public string ProdSendGeoLoc { get; set; }
        public string ProdCountry { get; set; }
        public string ProdState { get; set; }
        public string ProdCity { get; set; }
        public string ProdPostalCode { get; set; }
        public string ProdAddress { get; set; }
        public string ProdLat { get; set; }
        public string ProdLong { get; set; }
        public string LinkedIn { get; set; }
        public string Instagram { get; set; }
        public string Blog { get; set; }
        public string FaceBook { get; set; }
        public string Twitter { get; set; }
        public int AccountID { get; set; }
        public List<string> ProductFields { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
