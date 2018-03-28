var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./OutClassifierResult_types');
//HELPER FUNCTIONS AND STRUCTURES

var OutClassifierService_getEvaluationResult_args = function(args) {
  this.path = null;
  if (args) {
    if (args.path !== undefined && args.path !== null) {
      this.path = args.path;
    }
  }
};
OutClassifierService_getEvaluationResult_args.prototype = {};
OutClassifierService_getEvaluationResult_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.path = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getEvaluationResult_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getEvaluationResult_args');
  if (this.path !== null && this.path !== undefined) {
    output.writeFieldBegin('path', Thrift.Type.STRING, 1);
    output.writeString(this.path);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getEvaluationResult_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [null]);
    }
  }
};
OutClassifierService_getEvaluationResult_result.prototype = {};
OutClassifierService_getEvaluationResult_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.success = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readString();
          this.success.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getEvaluationResult_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getEvaluationResult_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRING, this.success.length);
    for (var iter7 in this.success)
    {
      if (this.success.hasOwnProperty(iter7))
      {
        iter7 = this.success[iter7];
        output.writeString(iter7);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getEvaluationByArith_args = function(args) {
  this.path = null;
  this.arithmetic = null;
  if (args) {
    if (args.path !== undefined && args.path !== null) {
      this.path = args.path;
    }
    if (args.arithmetic !== undefined && args.arithmetic !== null) {
      this.arithmetic = args.arithmetic;
    }
  }
};
OutClassifierService_getEvaluationByArith_args.prototype = {};
OutClassifierService_getEvaluationByArith_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.path = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.arithmetic = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getEvaluationByArith_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getEvaluationByArith_args');
  if (this.path !== null && this.path !== undefined) {
    output.writeFieldBegin('path', Thrift.Type.STRING, 1);
    output.writeString(this.path);
    output.writeFieldEnd();
  }
  if (this.arithmetic !== null && this.arithmetic !== undefined) {
    output.writeFieldBegin('arithmetic', Thrift.Type.I32, 2);
    output.writeI32(this.arithmetic);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getEvaluationByArith_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = Thrift.copyList(args.success, [null]);
    }
  }
};
OutClassifierService_getEvaluationByArith_result.prototype = {};
OutClassifierService_getEvaluationByArith_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.success = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = input.readString();
          this.success.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getEvaluationByArith_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getEvaluationByArith_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRING, this.success.length);
    for (var iter15 in this.success)
    {
      if (this.success.hasOwnProperty(iter15))
      {
        iter15 = this.success[iter15];
        output.writeString(iter15);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getKeyWord_args = function(args) {
  this.text = null;
  this.num = null;
  if (args) {
    if (args.text !== undefined && args.text !== null) {
      this.text = args.text;
    }
    if (args.num !== undefined && args.num !== null) {
      this.num = args.num;
    }
  }
};
OutClassifierService_getKeyWord_args.prototype = {};
OutClassifierService_getKeyWord_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.text = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.num = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getKeyWord_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getKeyWord_args');
  if (this.text !== null && this.text !== undefined) {
    output.writeFieldBegin('text', Thrift.Type.STRING, 1);
    output.writeString(this.text);
    output.writeFieldEnd();
  }
  if (this.num !== null && this.num !== undefined) {
    output.writeFieldBegin('num', Thrift.Type.I32, 2);
    output.writeI32(this.num);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getKeyWord_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_getKeyWord_result.prototype = {};
OutClassifierService_getKeyWord_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getKeyWord_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getKeyWord_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getKeyWordComplete_args = function(args) {
  this.title = null;
  this.content = null;
  if (args) {
    if (args.title !== undefined && args.title !== null) {
      this.title = args.title;
    }
    if (args.content !== undefined && args.content !== null) {
      this.content = args.content;
    }
  }
};
OutClassifierService_getKeyWordComplete_args.prototype = {};
OutClassifierService_getKeyWordComplete_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.title = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.content = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getKeyWordComplete_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getKeyWordComplete_args');
  if (this.title !== null && this.title !== undefined) {
    output.writeFieldBegin('title', Thrift.Type.STRING, 1);
    output.writeString(this.title);
    output.writeFieldEnd();
  }
  if (this.content !== null && this.content !== undefined) {
    output.writeFieldBegin('content', Thrift.Type.STRING, 2);
    output.writeString(this.content);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getKeyWordComplete_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_getKeyWordComplete_result.prototype = {};
OutClassifierService_getKeyWordComplete_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getKeyWordComplete_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getKeyWordComplete_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getNamedEntity_args = function(args) {
  this.text = null;
  if (args) {
    if (args.text !== undefined && args.text !== null) {
      this.text = args.text;
    }
  }
};
OutClassifierService_getNamedEntity_args.prototype = {};
OutClassifierService_getNamedEntity_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.text = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getNamedEntity_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getNamedEntity_args');
  if (this.text !== null && this.text !== undefined) {
    output.writeFieldBegin('text', Thrift.Type.STRING, 1);
    output.writeString(this.text);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getNamedEntity_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_getNamedEntity_result.prototype = {};
OutClassifierService_getNamedEntity_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getNamedEntity_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getNamedEntity_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getSensitiveWords_args = function(args) {
  this.dicpath = null;
  this.text = null;
  if (args) {
    if (args.dicpath !== undefined && args.dicpath !== null) {
      this.dicpath = args.dicpath;
    }
    if (args.text !== undefined && args.text !== null) {
      this.text = args.text;
    }
  }
};
OutClassifierService_getSensitiveWords_args.prototype = {};
OutClassifierService_getSensitiveWords_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.dicpath = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.text = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getSensitiveWords_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getSensitiveWords_args');
  if (this.dicpath !== null && this.dicpath !== undefined) {
    output.writeFieldBegin('dicpath', Thrift.Type.STRING, 1);
    output.writeString(this.dicpath);
    output.writeFieldEnd();
  }
  if (this.text !== null && this.text !== undefined) {
    output.writeFieldBegin('text', Thrift.Type.STRING, 2);
    output.writeString(this.text);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getSensitiveWords_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_getSensitiveWords_result.prototype = {};
OutClassifierService_getSensitiveWords_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getSensitiveWords_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getSensitiveWords_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_compareSimilarWords_args = function(args) {
  this.text1 = null;
  this.text2 = null;
  if (args) {
    if (args.text1 !== undefined && args.text1 !== null) {
      this.text1 = args.text1;
    }
    if (args.text2 !== undefined && args.text2 !== null) {
      this.text2 = args.text2;
    }
  }
};
OutClassifierService_compareSimilarWords_args.prototype = {};
OutClassifierService_compareSimilarWords_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.text1 = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.text2 = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_compareSimilarWords_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_compareSimilarWords_args');
  if (this.text1 !== null && this.text1 !== undefined) {
    output.writeFieldBegin('text1', Thrift.Type.STRING, 1);
    output.writeString(this.text1);
    output.writeFieldEnd();
  }
  if (this.text2 !== null && this.text2 !== undefined) {
    output.writeFieldBegin('text2', Thrift.Type.STRING, 2);
    output.writeString(this.text2);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_compareSimilarWords_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_compareSimilarWords_result.prototype = {};
OutClassifierService_compareSimilarWords_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.DOUBLE) {
        this.success = input.readDouble();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_compareSimilarWords_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_compareSimilarWords_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.DOUBLE, 0);
    output.writeDouble(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getProductId_args = function(args) {
};
OutClassifierService_getProductId_args.prototype = {};
OutClassifierService_getProductId_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getProductId_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getProductId_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getProductId_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_getProductId_result.prototype = {};
OutClassifierService_getProductId_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getProductId_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getProductId_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getAppSecret_args = function(args) {
};
OutClassifierService_getAppSecret_args.prototype = {};
OutClassifierService_getAppSecret_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getAppSecret_args.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getAppSecret_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierService_getAppSecret_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
OutClassifierService_getAppSecret_result.prototype = {};
OutClassifierService_getAppSecret_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

OutClassifierService_getAppSecret_result.prototype.write = function(output) {
  output.writeStructBegin('OutClassifierService_getAppSecret_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var OutClassifierServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
OutClassifierServiceClient.prototype = {};
OutClassifierServiceClient.prototype.seqid = function() { return this._seqid; }
OutClassifierServiceClient.prototype.new_seqid = function() { return this._seqid += 1; }
OutClassifierServiceClient.prototype.getEvaluationResult = function(path, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getEvaluationResult(path);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getEvaluationResult(path);
  }
};

OutClassifierServiceClient.prototype.send_getEvaluationResult = function(path) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getEvaluationResult', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getEvaluationResult_args();
  args.path = path;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getEvaluationResult = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getEvaluationResult_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getEvaluationResult failed: unknown result');
};
OutClassifierServiceClient.prototype.getEvaluationByArith = function(path, arithmetic, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getEvaluationByArith(path, arithmetic);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getEvaluationByArith(path, arithmetic);
  }
};

OutClassifierServiceClient.prototype.send_getEvaluationByArith = function(path, arithmetic) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getEvaluationByArith', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getEvaluationByArith_args();
  args.path = path;
  args.arithmetic = arithmetic;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getEvaluationByArith = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getEvaluationByArith_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getEvaluationByArith failed: unknown result');
};
OutClassifierServiceClient.prototype.getKeyWord = function(text, num, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getKeyWord(text, num);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getKeyWord(text, num);
  }
};

OutClassifierServiceClient.prototype.send_getKeyWord = function(text, num) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getKeyWord', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getKeyWord_args();
  args.text = text;
  args.num = num;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getKeyWord = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getKeyWord_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getKeyWord failed: unknown result');
};
OutClassifierServiceClient.prototype.getKeyWordComplete = function(title, content, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getKeyWordComplete(title, content);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getKeyWordComplete(title, content);
  }
};

OutClassifierServiceClient.prototype.send_getKeyWordComplete = function(title, content) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getKeyWordComplete', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getKeyWordComplete_args();
  args.title = title;
  args.content = content;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getKeyWordComplete = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getKeyWordComplete_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getKeyWordComplete failed: unknown result');
};
OutClassifierServiceClient.prototype.getNamedEntity = function(text, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getNamedEntity(text);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getNamedEntity(text);
  }
};

OutClassifierServiceClient.prototype.send_getNamedEntity = function(text) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getNamedEntity', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getNamedEntity_args();
  args.text = text;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getNamedEntity = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getNamedEntity_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getNamedEntity failed: unknown result');
};
OutClassifierServiceClient.prototype.getSensitiveWords = function(dicpath, text, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getSensitiveWords(dicpath, text);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getSensitiveWords(dicpath, text);
  }
};

OutClassifierServiceClient.prototype.send_getSensitiveWords = function(dicpath, text) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getSensitiveWords', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getSensitiveWords_args();
  args.dicpath = dicpath;
  args.text = text;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getSensitiveWords = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getSensitiveWords_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getSensitiveWords failed: unknown result');
};
OutClassifierServiceClient.prototype.compareSimilarWords = function(text1, text2, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_compareSimilarWords(text1, text2);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_compareSimilarWords(text1, text2);
  }
};

OutClassifierServiceClient.prototype.send_compareSimilarWords = function(text1, text2) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('compareSimilarWords', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_compareSimilarWords_args();
  args.text1 = text1;
  args.text2 = text2;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_compareSimilarWords = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_compareSimilarWords_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('compareSimilarWords failed: unknown result');
};
OutClassifierServiceClient.prototype.getProductId = function(callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getProductId();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getProductId();
  }
};

OutClassifierServiceClient.prototype.send_getProductId = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getProductId', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getProductId_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getProductId = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getProductId_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getProductId failed: unknown result');
};
OutClassifierServiceClient.prototype.getAppSecret = function(callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getAppSecret();
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getAppSecret();
  }
};

OutClassifierServiceClient.prototype.send_getAppSecret = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getAppSecret', Thrift.MessageType.CALL, this.seqid());
  var args = new OutClassifierService_getAppSecret_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

OutClassifierServiceClient.prototype.recv_getAppSecret = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new OutClassifierService_getAppSecret_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getAppSecret failed: unknown result');
};
var OutClassifierServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
OutClassifierServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

OutClassifierServiceProcessor.prototype.process_getEvaluationResult = function(seqid, input, output) {
  var args = new OutClassifierService_getEvaluationResult_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getEvaluationResult.length === 1) {
    Q.fcall(this._handler.getEvaluationResult, args.path)
      .then(function(result) {
        var result = new OutClassifierService_getEvaluationResult_result({success: result});
        output.writeMessageBegin("getEvaluationResult", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getEvaluationResult", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getEvaluationResult(args.path, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getEvaluationResult_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getEvaluationResult", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getEvaluationResult", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getEvaluationByArith = function(seqid, input, output) {
  var args = new OutClassifierService_getEvaluationByArith_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getEvaluationByArith.length === 2) {
    Q.fcall(this._handler.getEvaluationByArith, args.path, args.arithmetic)
      .then(function(result) {
        var result = new OutClassifierService_getEvaluationByArith_result({success: result});
        output.writeMessageBegin("getEvaluationByArith", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getEvaluationByArith", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getEvaluationByArith(args.path, args.arithmetic, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getEvaluationByArith_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getEvaluationByArith", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getEvaluationByArith", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getKeyWord = function(seqid, input, output) {
  var args = new OutClassifierService_getKeyWord_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getKeyWord.length === 2) {
    Q.fcall(this._handler.getKeyWord, args.text, args.num)
      .then(function(result) {
        var result = new OutClassifierService_getKeyWord_result({success: result});
        output.writeMessageBegin("getKeyWord", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getKeyWord", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getKeyWord(args.text, args.num, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getKeyWord_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getKeyWord", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getKeyWord", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getKeyWordComplete = function(seqid, input, output) {
  var args = new OutClassifierService_getKeyWordComplete_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getKeyWordComplete.length === 2) {
    Q.fcall(this._handler.getKeyWordComplete, args.title, args.content)
      .then(function(result) {
        var result = new OutClassifierService_getKeyWordComplete_result({success: result});
        output.writeMessageBegin("getKeyWordComplete", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getKeyWordComplete", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getKeyWordComplete(args.title, args.content, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getKeyWordComplete_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getKeyWordComplete", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getKeyWordComplete", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getNamedEntity = function(seqid, input, output) {
  var args = new OutClassifierService_getNamedEntity_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getNamedEntity.length === 1) {
    Q.fcall(this._handler.getNamedEntity, args.text)
      .then(function(result) {
        var result = new OutClassifierService_getNamedEntity_result({success: result});
        output.writeMessageBegin("getNamedEntity", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getNamedEntity", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getNamedEntity(args.text, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getNamedEntity_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getNamedEntity", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getNamedEntity", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getSensitiveWords = function(seqid, input, output) {
  var args = new OutClassifierService_getSensitiveWords_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getSensitiveWords.length === 2) {
    Q.fcall(this._handler.getSensitiveWords, args.dicpath, args.text)
      .then(function(result) {
        var result = new OutClassifierService_getSensitiveWords_result({success: result});
        output.writeMessageBegin("getSensitiveWords", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getSensitiveWords", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getSensitiveWords(args.dicpath, args.text, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getSensitiveWords_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getSensitiveWords", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getSensitiveWords", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_compareSimilarWords = function(seqid, input, output) {
  var args = new OutClassifierService_compareSimilarWords_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.compareSimilarWords.length === 2) {
    Q.fcall(this._handler.compareSimilarWords, args.text1, args.text2)
      .then(function(result) {
        var result = new OutClassifierService_compareSimilarWords_result({success: result});
        output.writeMessageBegin("compareSimilarWords", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("compareSimilarWords", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.compareSimilarWords(args.text1, args.text2, function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_compareSimilarWords_result((err != null ? err : {success: result}));
        output.writeMessageBegin("compareSimilarWords", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("compareSimilarWords", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getProductId = function(seqid, input, output) {
  var args = new OutClassifierService_getProductId_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getProductId.length === 0) {
    Q.fcall(this._handler.getProductId)
      .then(function(result) {
        var result = new OutClassifierService_getProductId_result({success: result});
        output.writeMessageBegin("getProductId", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getProductId", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getProductId(function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getProductId_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getProductId", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getProductId", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

OutClassifierServiceProcessor.prototype.process_getAppSecret = function(seqid, input, output) {
  var args = new OutClassifierService_getAppSecret_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getAppSecret.length === 0) {
    Q.fcall(this._handler.getAppSecret)
      .then(function(result) {
        var result = new OutClassifierService_getAppSecret_result({success: result});
        output.writeMessageBegin("getAppSecret", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getAppSecret", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getAppSecret(function (err, result) {
      if (err == null) {
        var result = new OutClassifierService_getAppSecret_result((err != null ? err : {success: result}));
        output.writeMessageBegin("getAppSecret", Thrift.MessageType.REPLY, seqid);
      } else {
        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getAppSecret", Thrift.MessageType.EXCEPTION, seqid);
      }
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

