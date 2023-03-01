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
    public class SupplierFacade : ISupplierFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;
        private readonly DemoContext context;

        public SupplierFacade(IUnitOfWork unitofWork, IMapper mapper , DemoContext context)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
            this.context = context;
        }
        public int Add(SupplierDTO entity)
        {
            Supplier supplierDTO = mapper.Map<SupplierDTO, Supplier>(entity);
            List<SupplierProducts> supplierProducts = new List<SupplierProducts>();
            // Add Product to Many To Many Table 
            foreach (var item in entity.ProductFields)
            {
                SupplierProducts supplierProduct = JsonSerializer.Deserialize<SupplierProducts>(item);
                supplierProducts.Add(new SupplierProducts() { ProductID = supplierProduct.ProductID });
            }
            supplierDTO.SupplierProducts = supplierProducts;
            unitofWork.Supplier.Add(supplierDTO);
            unitofWork.Save();
            return supplierDTO.SupplierID;
        }

        public IEnumerable<SupplierDTO> GetAll()
        {
            IEnumerable<Supplier> supplier = unitofWork.Supplier.GetAll();
            IEnumerable<SupplierDTO> supplierDTO = mapper.Map<IEnumerable<Supplier>, IEnumerable<SupplierDTO>>(supplier);
            return supplierDTO;
        }

        public SupplierDTO GetById(int id)
        {
            Supplier supplier = unitofWork.Supplier.GetSupplierByID(id);
            List<string> prods = new List<string>();
            // Get Related Products From Many to Many Table
            foreach (var item in supplier.SupplierProducts)
            {
                item.Products = unitofWork.Products.GetById(item.ProductID);
                prods.Add(JsonSerializer.Serialize(item));
            }
            SupplierDTO supplierDTO = mapper.Map<Supplier, SupplierDTO>(supplier);
            supplierDTO.ProductFields = prods;
            return supplierDTO;
        }

        public void Remove(SupplierDTO entity)
        {
            Supplier supplierDTO = mapper.Map<SupplierDTO, Supplier>(entity);
            unitofWork.Supplier.Remove(supplierDTO);
            unitofWork.Save();
        }

        public void Update(SupplierDTO entity)
        {
            Supplier supplierDTO = mapper.Map<SupplierDTO, Supplier>(entity);
            Supplier supplier = unitofWork.Supplier.GetSupplierByID(entity.SupplierID);
            // Delete Product From Many to Many Table
            foreach (var item in supplier.SupplierProducts.ToList())
            {
                supplier.SupplierProducts.Remove(item);
                context.Entry(item).State = EntityState.Deleted;
            }
            context.SaveChanges();
            List<SupplierProducts> supplierProducts = new List<SupplierProducts>();
            // Add Product to Many to Many Table
            foreach (var item in entity.ProductFields)
            {
                SupplierProducts supplierProduct = JsonSerializer.Deserialize<SupplierProducts>(item);
                supplierProducts.Add(new SupplierProducts() { ProductID = supplierProduct.ProductID });
            }
            supplierDTO.SupplierProducts = supplierProducts;
            supplierDTO.CreatedDate = supplier.CreatedDate;
            unitofWork.Supplier.Update(supplierDTO);
            unitofWork.Save();
        }
    }
}
