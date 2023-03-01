using AutoMapper;
using SamanCRM.Core.Contracts.Facade;
using SamanCRM.Core.Contracts.UnitofWork;
using SamanCRM.Core.Domain.Entities;
using SamanCRM.Shared.DomainModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace SamanCRM.Core.ApplicationService.Facade
{
    public class ProductsFacade : IProductsFacade
    {
        private readonly IUnitOfWork unitofWork;
        private readonly IMapper mapper;

        public ProductsFacade(IUnitOfWork unitofWork, IMapper mapper)
        {
            this.unitofWork = unitofWork;
            this.mapper = mapper;
        }
        public int Add(ProductsDTO entity)
        {
            Products productsDTO = mapper.Map<ProductsDTO, Products>(entity);
            List<Archive> archive = new List<Archive>();
            unitofWork.Products.Add(productsDTO);
            unitofWork.Save();
            // Add Product Images To Archive
            foreach (var item in entity.ProductImage)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = productsDTO.ProductID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "Products" };
                archive.Add(picarchive);
            }
            // Add Product Files To Archive
            foreach (var item in entity.ProductFiles)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = productsDTO.ProductID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "ProductFiles" };
                archive.Add(picarchive);
            }
            // Add Barcode Image To Archive
            foreach (var item in entity.BarcodeImage)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = productsDTO.ProductID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "ProductBarcodes" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.AddRange(archive);
            unitofWork.Save();
            return productsDTO.ProductID;
        }

        public IEnumerable<ProductsDTO> GetAll()
        {
            IEnumerable<Products> products = unitofWork.Products.GetAll();
            IEnumerable<ProductsDTO> productsDTO = mapper.Map<IEnumerable<Products>, IEnumerable<ProductsDTO>>(products);
            return productsDTO;
        }

        public ProductsDTO GetById(int id)
        {
            Products products = unitofWork.Products.GetById(id);
            List<Archive> archive = unitofWork.Archive.GetArchiveByRecordID(id);
            List<string> pictures = new List<string>();
            List<string> files = new List<string>();
            List<string> barcodes = new List<string>();
            // Get Related Files and Photos From Archive
            foreach (var item in archive)
            {
                if (item.EntityType == "Products" || item.EntityType == "ProductFiles" || item.EntityType == "ProductBarcodes")
                {
                    string rawPic = Convert.ToBase64String(item.File);
                    string file = "FileName:" + item.FileName + ",data:" + item.FileFormat + ";base64," + rawPic;
                    if (item.EntityType == "Products")
                    {
                        pictures.Add(file);
                    }
                    if (item.EntityType == "ProductFiles")
                    {
                        files.Add(file);
                    }
                    if (item.EntityType == "ProductBarcodes")
                    {
                        barcodes.Add(file);
                    }
                }
            }
            ProductsDTO productsDTO = mapper.Map<Products, ProductsDTO>(products);
            productsDTO.ProductImage = pictures;
            productsDTO.ProductFiles = files;
            productsDTO.BarcodeImage = barcodes;
            return productsDTO;
        }

        public void Remove(ProductsDTO entity)
        {
            Products productsDTO = mapper.Map<ProductsDTO, Products>(entity);
            List<Archive> archive = unitofWork.Archive.GetArchiveByRecordID(entity.ProductID);
            unitofWork.Products.Remove(productsDTO);
            unitofWork.Archive.RemoveRange(archive);
            unitofWork.Save();
        }

        public void Update(ProductsDTO entity)
        {
            Products productsDTO = mapper.Map<ProductsDTO, Products>(entity);
            List<Archive> archive = new List<Archive>();
            ProductsDTO products = GetById(productsDTO.ProductID);
            productsDTO.CreatedDate = products.CreatedDate;
            unitofWork.Products.Update(productsDTO);
            unitofWork.Save();
            // Update Product Images
            foreach (var item in entity.ProductImage)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = productsDTO.ProductID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "Products" };
                archive.Add(picarchive);
            }
            // Update Product Files
            foreach (var item in entity.ProductFiles)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = productsDTO.ProductID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "ProductFiles" };
                archive.Add(picarchive);
            }
            // Update Barcode Images
            foreach (var item in entity.BarcodeImage)
            {
                ArchiveDTO archives = JsonSerializer.Deserialize<ArchiveDTO>(item);
                Archive picarchive = new Archive() { RecordID = productsDTO.ProductID, File = Convert.FromBase64String(archives.File), ArchiveGuid = Guid.NewGuid(), BranchID = 0, CreatedDate = DateTime.Now, ModifiedDate = DateTime.Now, FileFormat = archives.FileFormat, FileName = archives.FileName, EntityType = "ProductBarcodes" };
                archive.Add(picarchive);
            }
            unitofWork.Archive.UpdateRange(archive);
            unitofWork.Save();
        }
    }
}
