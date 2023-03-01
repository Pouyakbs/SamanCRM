using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Infrastructure.EF;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class InvoiceFacade : IInvoiceFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;
        private readonly DemoContext context;

        public InvoiceFacade(IUnitOfWork unitofWork, IMapper mapper, DemoContext context)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
            this.context = context;
        }
        public int Add(InvoiceDTO entity)
        {
            Invoice invoiceDTO = mapper.Map<InvoiceDTO, Invoice>(entity);
            List<InvoiceProducts> invoiceProducts = new List<InvoiceProducts>();
            // Add Product to Many To Many Table 
            foreach (var item in entity.ProductsID)
            {
                int productID = Int32.Parse(item);
                invoiceProducts.Add(new InvoiceProducts() { ProductID = productID });
            }
            invoiceDTO.InvoiceProducts = invoiceProducts;
            unitofWork.Invoice.Add(invoiceDTO);
            unitofWork.Save();
            return invoiceDTO.InvoiceID;
        }

        public IEnumerable<InvoiceDTO> GetAll()
        {
            IEnumerable<Invoice> invoice = unitofWork.Invoice.GetAll();
            IEnumerable<InvoiceDTO> invoiceDTO = mapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceDTO>>(invoice);
            return invoiceDTO;
        }

        public InvoiceDTO GetById(int id)
        {
            Invoice invoice = unitofWork.Invoice.GetInvoiceByID(id);
            List<string> prods = new List<string>();
            // Get Related Products From Many to Many Table
            foreach (var item in invoice.InvoiceProducts)
            {
                item.Products = unitofWork.Products.GetById(item.ProductID);
                prods.Add(JsonSerializer.Serialize(item));
            }
            InvoiceDTO invoiceDTO = mapper.Map<Invoice, InvoiceDTO>(invoice);
            invoiceDTO.ProductsID = prods;
            return invoiceDTO;
        }

        public void Remove(InvoiceDTO entity)
        {
            Invoice invoiceDTO = mapper.Map<InvoiceDTO, Invoice>(entity);
            unitofWork.Invoice.Remove(invoiceDTO);
            unitofWork.Save();
        }

        public void Update(InvoiceDTO entity)
        {
            Invoice invoiceDTO = mapper.Map<InvoiceDTO, Invoice>(entity);
            Invoice invoice = unitofWork.Invoice.GetInvoiceByID(entity.InvoiceID);
            // Delete Product From Many to Many Table
            foreach (var item in invoice.InvoiceProducts.ToList())
            {
                invoice.InvoiceProducts.Remove(item);
                context.Entry(item).State = EntityState.Deleted;
            }
            context.SaveChanges(); 
            List<InvoiceProducts> invoiceProducts = new List<InvoiceProducts>();
            // Add Product to Many to Many Table
            foreach (var item in entity.ProductsID)
            {
                int productID = Int32.Parse(item);
                invoiceProducts.Add(new InvoiceProducts() { ProductID = productID });
            }
            invoiceDTO.InvoiceProducts = invoiceProducts;
            invoiceDTO.CreatedDate = invoice.CreatedDate;
            unitofWork.Invoice.Update(invoiceDTO);
            unitofWork.Save();
        }
    }
}
