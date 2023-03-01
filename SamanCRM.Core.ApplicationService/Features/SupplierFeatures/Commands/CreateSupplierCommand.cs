using MediatR;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.SupplierFeatures.Commands
{
    public class CreateSupplierCommand : IRequest<int>
    {
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
        public class CreateSupplierCommandHandler : IRequestHandler<CreateSupplierCommand, int>
        {
            private readonly ISupplierFacade supplierFacade;

            public CreateSupplierCommandHandler(ISupplierFacade supplierFacade)
            {
                this.supplierFacade = supplierFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateSupplierCommand command, CancellationToken cancellationToken)
            {
                var supplierDTO = new SupplierDTO();
                supplierDTO.Attractiveness = command.Attractiveness;
                supplierDTO.BillAddress = command.BillAddress;
                supplierDTO.BillCity = command.BillCity;
                supplierDTO.BillCountry = command.BillCountry;
                supplierDTO.BillLat = command.BillLat;
                supplierDTO.BillLong = command.BillLong;
                supplierDTO.BillPostalCode = command.BillPostalCode;
                supplierDTO.BillSendGeoLoc = command.BillSendGeoLoc;
                supplierDTO.BillState = command.BillState;
                supplierDTO.Blog = command.Blog;
                supplierDTO.Desc = command.Desc;
                supplierDTO.EcoCode = command.EcoCode;
                supplierDTO.Emails = command.Emails;
                supplierDTO.FaceBook = command.FaceBook;
                supplierDTO.Industry = command.Industry;
                supplierDTO.SubIndustry = command.SubIndustry;
                supplierDTO.Instagram = command.Instagram;
                supplierDTO.LinkedIn = command.LinkedIn;
                supplierDTO.Name = command.Name;
                supplierDTO.Surname = command.Surname;
                supplierDTO.NationalNum = command.NationalNum;
                supplierDTO.ContactFields = command.ContactFields;
                supplierDTO.ProdAddress = command.ProdAddress;
                supplierDTO.ProdCity = command.ProdCity;
                supplierDTO.ProdCountry = command.ProdCountry;
                supplierDTO.ProdLat = command.ProdLat;
                supplierDTO.ProdLong = command.ProdLong;
                supplierDTO.ProdPostalCode = command.ProdPostalCode;
                supplierDTO.ProdSendGeoLoc = command.ProdSendGeoLoc;
                supplierDTO.ProdState = command.ProdState;
                supplierDTO.Status = command.Status;
                supplierDTO.SubNum = command.SubNum;
                supplierDTO.SupplierNum = command.SupplierNum;
                supplierDTO.Twitter = command.Twitter;
                supplierDTO.AccountID = command.AccountID;
                supplierDTO.ProductFields = command.ProductFields;
                supplierDTO.NickName = command.NickName;
                supplierDTO.User = command.User;
                supplierDTO.Website = command.Website;
                supplierDTO.CreatedDate = DateTime.Now;
                supplierDTO.SupplierGuid = Guid.NewGuid();
                supplierFacade.Add(supplierDTO);
                return supplierDTO.SupplierID;
            }
        }
    }
}
