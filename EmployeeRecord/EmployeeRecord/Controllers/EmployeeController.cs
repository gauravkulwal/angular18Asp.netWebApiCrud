using EmployeeRecord.Data;
using EmployeeRecord.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeRecord.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController: ControllerBase
    {
        public readonly EmployeeDbContext _dbContext;
        public EmployeeController(EmployeeDbContext dbContext) {
        _dbContext = dbContext;
        }
        [HttpGet("All" , Name ="all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAllEmployee() {
        
            var employee = _dbContext.Employees.ToList();
            return Ok(employee);
        }
        [HttpPost]
        public IActionResult AddEmployee(EmployeeDto model) {
        if(!ModelState.IsValid) 
                return BadRequest(ModelState);

        var employee = new Employee()
        {
            Id= Guid.NewGuid(),
            FullName = model.FullName,
            Email = model.Email,
            Gender  = model.Gender,
            Contact = model.Contact,
            DateOfJoin = model.DateOfJoin,
            IsPermanent = model.IsPermanent,
            Department = model.Department,
        };
            _dbContext.Employees.Add(employee);
            _dbContext.SaveChanges();
            return Ok(employee);
        }

        [HttpGet("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetEmployeeById(Guid id)
        {
           if(id == Guid.Empty)
                return BadRequest();

            var employee = _dbContext.Employees.Where(x => string.Equals(x.Id, id));

            if(employee == null)
                return NotFound();
            
            return Ok(employee);
          
        }
        [HttpDelete("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteByid(Guid id)
        {
            if (id == Guid.Empty)   
                return BadRequest();
            var employee= _dbContext.Employees.Where(x => string.Equals(x.Id , id)).FirstOrDefault();
            if(employee == null)
                return NotFound();
            _dbContext.Employees.Remove(employee);
            _dbContext.SaveChanges();
            return NoContent();
        }
        [HttpPut("{id:Guid}")]
        public IActionResult UpdateRecord(Guid id, EmployeeDto model)
        {
            if(id == Guid.Empty)
                return BadRequest();
            var existingEmployee = _dbContext.Employees.AsNoTracking().Where(x => x.Id == id).FirstOrDefault();
            if(existingEmployee == null)
                return NotFound();
            var employee = new Employee()
            {
                Id = existingEmployee.Id,


                FullName = model.FullName,
                Email = model.Email,
                Gender = model.Gender,
                Contact = model.Contact,
                DateOfJoin = model.DateOfJoin,
                IsPermanent = model.IsPermanent,
                Department = model.Department,
            };

                _dbContext.Employees.Update(employee);
            _dbContext.SaveChanges();
            return Ok(employee);
        }
    }
    
}
