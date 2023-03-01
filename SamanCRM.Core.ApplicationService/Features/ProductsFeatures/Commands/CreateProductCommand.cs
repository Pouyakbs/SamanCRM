using MediatR;
using Microsoft.AspNetCore.Http;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamanCRM.Core.ApplicationService.Features.ProductsFeatures.Commands
{
    public class CreateProductCommand : IRequest<int>
    {
        public int CategoryID { get; set; }
        public string ProductName { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public string ProductCode { get; set; }
        public string MoneyUnit { get; set; }
        public double SalePrice { get; set; }
        public double PurchasePrice { get; set; }
        public string MainMeasurement { get; set; }
        public string SecondMeasurement { get; set; }
        public int HoursCount { get; set; }
        public string BatchNum { get; set; }
        public string SerialNum { get; set; }
        public string LatNum { get; set; }
        public DateTime ValidityDate { get; set; }
        public string ProductURL { get; set; }
        public string Barcode { get; set; }
        public string InvoiceType { get; set; }
        public bool Saleable { get; set; }
        public bool NeedProductReturn { get; set; }
        public double Length { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double NetWeight { get; set; }
        public double GrossWeight { get; set; }
        public List<string> ProductImage { get; set; }
        public List<string> ProductImageFormat { get; set; }
        public List<string> ProductFiles { get; set; }
        public List<string> ProductFilesFormat { get; set; }
        public List<string> BarcodeImage { get; set; }
        public List<string> BarcodeImageFormat { get; set; }
        public int PocketNum { get; set; }
        public string Desc { get; set; }
        public string NumPerUnit { get; set; }
        public string StoreInventory { get; set; }
        public string OrderRate { get; set; }
        public string AvailableForSale { get; set; }
        public string SafetyStock { get; set; }
        public string Pursuer { get; set; }
        public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>
        {
            private readonly IProductsFacade productFacade;

            public CreateProductCommandHandler(IProductsFacade productFacade)
            {
                this.productFacade = productFacade;
            }
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
            public async Task<int> Handle(CreateProductCommand command, CancellationToken cancellationToken)
            {
                var productDTO = new ProductsDTO();
                productDTO.AvailableForSale = command.AvailableForSale;
                productDTO.Barcode = command.Barcode;
                productDTO.Length = command.Length;
                productDTO.BatchNum = command.BatchNum;
                productDTO.Brand = command.Brand;
                productDTO.Width = command.Width;
                productDTO.Height = command.Height;
                productDTO.Desc = command.Desc;
                productDTO.NetWeight = command.NetWeight;
                productDTO.PurchasePrice = command.PurchasePrice;
                productDTO.InvoiceType = command.InvoiceType;
                productDTO.LatNum = command.LatNum;
                productDTO.MainMeasurement = command.MainMeasurement;
                productDTO.MoneyUnit = command.MoneyUnit;
                productDTO.NeedProductReturn = command.NeedProductReturn;
                productDTO.NumPerUnit = command.NumPerUnit;
                productDTO.OrderRate = command.OrderRate;
                productDTO.GrossWeight = command.GrossWeight;
                productDTO.ProductCode = command.ProductCode;
                productDTO.ProductName = command.ProductName;
                productDTO.ProductImage = command.ProductImage;
                productDTO.ProductImageFormat = command.ProductImageFormat;
                productDTO.ProductFiles = command.ProductFiles;
                productDTO.ProductFilesFormat = command.ProductFilesFormat;
                productDTO.BarcodeImage = command.BarcodeImage;
                productDTO.BarcodeImageFormat = command.BarcodeImageFormat;
                productDTO.PocketNum = command.PocketNum;
                productDTO.ProductURL = command.ProductURL;
                productDTO.SafetyStock = command.SafetyStock;
                productDTO.Saleable = command.Saleable;
                productDTO.SalePrice = command.SalePrice;
                productDTO.SecondMeasurement = command.SecondMeasurement;
                productDTO.SerialNum = command.SerialNum;
                productDTO.Status = command.Status;
                productDTO.StoreInventory = command.StoreInventory;
                productDTO.Type = command.Type;
                productDTO.Pursuer = command.Pursuer;
                productDTO.CategoryID = command.CategoryID;
                productDTO.ValidityDate = command.ValidityDate;
                productDTO.CreatedDate = DateTime.Now;
                productDTO.ProductGuid = Guid.NewGuid();
                productFacade.Add(productDTO);
                return productDTO.ProductID;
            }
        }
    }
}
